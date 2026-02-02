import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface AvatarUploadProps {
    currentAvatarUrl?: string | null;
    onUploadComplete?: (url: string) => void;
}

export function AvatarUpload({ currentAvatarUrl, onUploadComplete }: AvatarUploadProps) {
    const { user, refreshProfile } = useAuthStore();
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_SIZE = 1024 * 1024; // 1MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    const resizeImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            img.onload = () => {
                const size = 256;
                canvas.width = size;
                canvas.height = size;

                // Calculate crop to center
                const minDim = Math.min(img.width, img.height);
                const sx = (img.width - minDim) / 2;
                const sy = (img.height - minDim) / 2;

                ctx?.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error('Failed to convert canvas to blob'));
                    },
                    'image/webp',
                    0.85
                );
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(file);
        });
    };

    const validateFile = (file: File): string | null => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Formato inválido. Use JPEG, PNG, WebP ou GIF.';
        }
        if (file.size > MAX_SIZE) {
            return 'Arquivo muito grande. Máximo 1MB.';
        }
        return null;
    };

    const handleFile = async (file: File) => {
        setError(null);

        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleUpload = async () => {
        if (!preview || !user) return;

        setUploading(true);
        setError(null);

        try {
            // Get the file from input
            const file = inputRef.current?.files?.[0];
            if (!file) throw new Error('No file selected');

            // Resize the image
            const resizedBlob = await resizeImage(file);

            // Generate unique filename
            const fileName = `${user.id}/avatar.webp`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, resizedBlob, {
                    upsert: true,
                    contentType: 'image/webp'
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            // Add cache-busting timestamp
            const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;

            // Update profile in database
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: urlWithTimestamp })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // Refresh profile in store
            await refreshProfile();

            onUploadComplete?.(urlWithTimestamp);
            setPreview(null);

        } catch (err) {
            console.error('Upload error:', err);
            setError('Erro ao fazer upload. Tente novamente.');
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        setPreview(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const displayAvatar = preview || currentAvatarUrl;

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Avatar Display */}
            <div
                className={`
                    relative w-32 h-32 rounded-full overflow-hidden cursor-pointer
                    border-2 transition-all duration-300
                    ${dragActive
                        ? 'border-liquid-primary scale-105 shadow-lg shadow-liquid-primary/30'
                        : 'border-white/10 hover:border-white/30'
                    }
                    ${!displayAvatar ? 'bg-white/5' : ''}
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
            >
                {displayAvatar ? (
                    <img
                        src={displayAvatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                {/* Loading overlay */}
                {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-liquid-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleInputChange}
            />

            {/* Instructions */}
            <p className="text-sm text-white/50 text-center">
                Clique ou arraste uma imagem<br />
                <span className="text-xs">JPEG, PNG, WebP ou GIF • Máx 1MB</span>
            </p>

            {/* Error message */}
            {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            {/* Action buttons when preview exists */}
            {preview && (
                <div className="flex gap-3">
                    <button
                        onClick={handleCancel}
                        disabled={uploading}
                        className="px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="px-4 py-2 rounded-lg bg-liquid-primary text-black font-medium hover:bg-liquid-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

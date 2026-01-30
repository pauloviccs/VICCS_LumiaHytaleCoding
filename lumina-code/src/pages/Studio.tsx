import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, ArrowLeft, Terminal as TerminalIcon } from 'lucide-react';
import { useViewStore } from '@/store/viewStore';

export default function Studio() {
    const { setView } = useViewStore();
    const [output, setOutput] = useState<string[]>(['> System initialized.', '> Ready for input...']);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setIsRunning(true);
        setOutput(prev => [...prev, '> Compiling...', '> Running Main.java...']);

        setTimeout(() => {
            setOutput(prev => [...prev, 'Hello World', '> Process finished with exit code 0.']);
            setIsRunning(false);
        }, 1500);
    };

    return (
        <div className="h-screen bg-[#0a0a0a] flex flex-col text-white overflow-hidden font-sans">
            {/* Top Bar */}
            <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setView('dashboard')}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-liquid-primary font-bold">MODULE 1.1</span>
                        <span className="text-gray-500">/</span>
                        <span className="text-sm font-medium">Hello World</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded text-sm transition-colors disabled:opacity-50"
                    >
                        <Play size={14} fill="currentColor" />
                        {isRunning ? 'RUNNING...' : 'RUN CODE'}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Content */}
                <div className="w-[400px] border-r border-white/10 flex flex-col bg-black/20">
                    <div className="p-8 overflow-y-auto">
                        <h1 className="text-2xl font-bold mb-4">Your First Spell</h1>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            In the world of Hytale modding, everything starts with printing to the console.
                            This verifies that your mod has loaded correctly.
                        </p>

                        <div className="space-y-4 mb-8">
                            <h3 className="font-bold text-sm text-gray-300 uppercase tracking-wider">Objectives</h3>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                                <div className="mt-0.5"><div className="w-4 h-4 rounded border border-gray-500" /></div>
                                <span className="text-gray-300">Using `System.out.println`, print "Hello World" to the console.</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                            <strong>Tip:</strong> Java is case-sensitive. `System` must start with a capital S.
                        </div>
                    </div>
                </div>

                {/* Right Panel: Editor & Terminal */}
                <div className="flex-1 flex flex-col relative">
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            defaultLanguage="java"
                            defaultValue={`public class Main {
  public static void main(String[] args) {
    // Write your code here
    
  }
}`}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: 'JetBrains Mono, monospace',
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Terminal */}
                    <div className="h-48 border-t border-white/10 bg-black flex flex-col">
                        <div className="h-8 flex items-center px-4 bg-white/5 border-b border-white/5 gap-2">
                            <TerminalIcon size={14} className="text-gray-500" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Console Output</span>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-y-auto space-y-1">
                            {output.map((line, i) => (
                                <div key={i} className={line.startsWith('>') ? 'text-gray-500' : 'text-white'}>
                                    {line}
                                </div>
                            ))}
                            {isRunning && <span className="animate-pulse">_</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

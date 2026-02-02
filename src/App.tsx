import { useEffect } from 'react';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import Studio from '@/pages/Studio';
import Documentation from '@/pages/Documentation';
import PricingPage from '@/pages/PricingPage';
import Settings from '@/pages/Settings';
import { useAuthStore } from '@/store/authStore';
import { useViewStore } from '@/store/viewStore';
import { AmbientBackground } from '@/components/layout/AmbientBackground';

function App() {
  const { initialize, user, loading } = useAuthStore();
  const { currentView } = useViewStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-liquid-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user && (currentView as string) !== 'documentation' && (currentView as string) !== 'pricing') return <LandingPage />;

  return (
    <>
      <AmbientBackground />
      {currentView === 'dashboard' && user && <Dashboard />}
      {currentView === 'studio' && user && <Studio />}
      {currentView === 'settings' && user && <Settings />}
      {(currentView as string) === 'pricing' && <PricingPage />}
      {((currentView as string) === 'documentation' || (!user && (currentView as string) === 'documentation')) && <Documentation />}
      {!user && (currentView as string) !== 'documentation' && (currentView as string) !== 'pricing' && <LandingPage />}
    </>
  )
}

export default App

import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isSystemOnline, setIsSystemOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cd_simulated_offline') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleOnline = () => setIsSystemOnline(true);
    const handleOffline = () => setIsSystemOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSimulatedOffline = () => {
    setSimulatedOffline((prev) => {
      const next = !prev;
      localStorage.setItem('cd_simulated_offline', next ? 'true' : 'false');
      return next;
    });
  };

  const isOnline = isSystemOnline && !simulatedOffline;

  return {
    isOnline,
    isSystemOnline,
    simulatedOffline,
    toggleSimulatedOffline,
  };
}

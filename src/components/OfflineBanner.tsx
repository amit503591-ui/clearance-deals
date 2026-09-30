import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
  simulatedOffline: boolean;
  onToggleSimulated: () => void;
  cachedCount: number;
  onRefresh: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOnline,
  simulatedOffline,
  onToggleSimulated,
  cachedCount,
  onRefresh,
}) => {
  if (isOnline) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sticky top-0 z-30 animate-slideDown">
      <div className="flex items-center gap-2.5">
        <div className="p-1 rounded-lg bg-black/20 shrink-0">
          <WifiOff className="w-4 h-4 text-amber-200" />
        </div>
        <div>
          <div className="font-bold flex items-center gap-1.5">
            <span>Offline Mode Active</span>
            {simulatedOffline && (
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono text-amber-200">
                Simulated
              </span>
            )}
          </div>
          <p className="text-[11px] text-amber-100/90">
            Serving {cachedCount} cached deals from IndexedDB offline storage
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {simulatedOffline ? (
          <button
            onClick={onToggleSimulated}
            className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-[11px] transition"
          >
            Go Online
          </button>
        ) : (
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
            title="Retry Connection"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

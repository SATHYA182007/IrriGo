import React from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOffline } = useFarm();
  const { t } = useLanguage();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-white text-xs py-2 px-4 flex items-center justify-between shadow-xs z-50 sticky top-0">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2 font-medium">
          <WifiOff className="w-4 h-4 animate-pulse text-amber-100" />
          <span>{t.offlineMode} — {t.lastSynced}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-amber-100 text-[11px]">Cached farm data active</span>
          <button
            onClick={toggleOffline}
            className="flex items-center gap-1.5 bg-white text-amber-900 px-2.5 py-1 rounded-full text-[11px] font-bold hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            {t.syncNow}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MapPin, LocateFixed, RefreshCw, Radio } from 'lucide-react';
import { useRealtimeLocation } from '../hooks/useRealtimeLocation';

interface RealtimeLocationBadgeProps {
  className?: string;
  farmSize?: string;
  showDetails?: boolean;
}

export const RealtimeLocationBadge: React.FC<RealtimeLocationBadgeProps> = ({
  className = '',
  farmSize = '2.4 Acres',
  showDetails = true
}) => {
  const { locationName, isLoading, isLive, refreshLocation } = useRealtimeLocation('Salem, Tamil Nadu');

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Main Location Badge pill */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/90 px-3 py-1.5 rounded-full border border-emerald-100/90 shadow-2xs">
        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="text-slate-700 font-bold tracking-tight">
          {locationName} {showDetails && farmSize ? `• ${farmSize}` : ''}
        </span>

        {/* Live GPS Signal Pulse Dot */}
        {isLive && (
          <span className="inline-flex items-center gap-1 ml-1 pl-1.5 border-l border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[9px] font-extrabold uppercase text-emerald-700 tracking-wider">LIVE</span>
          </span>
        )}
      </div>

      {/* Manual Refresh / Locate Button */}
      <button
        onClick={refreshLocation}
        disabled={isLoading}
        title="Detect current real-time GPS location"
        className="p-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/90 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
        ) : (
          <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />
        )}
      </button>
    </div>
  );
};

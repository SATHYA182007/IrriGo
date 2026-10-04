import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, ArrowUpRight } from 'lucide-react';

interface StatusCardProps {
  icon: React.ReactNode;
  title: string;
  statusText: string;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'info' | 'alert';
  detailMetric?: string;
  detailLabel?: string;
  technicalDetails?: Array<{ label: string; value: string }>;
  onClickAction?: () => void;
  actionText?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  icon,
  title,
  statusText,
  badgeText,
  badgeVariant = 'success',
  detailMetric,
  detailLabel,
  technicalDetails,
  onClickAction,
  actionText
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const badgeStyles = {
    success: 'bg-emerald-100/90 text-emerald-900 border-emerald-300/80 font-bold',
    warning: 'bg-amber-100/90 text-amber-900 border-amber-300/80 font-bold',
    info: 'bg-sky-100/90 text-sky-900 border-sky-300/80 font-bold',
    alert: 'bg-rose-100/90 text-rose-900 border-rose-300/80 font-bold'
  };

  return (
    <div className="flex flex-col justify-between h-full p-5 bg-white/95 rounded-2xl border border-emerald-100/90 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all group">
      <div className="space-y-3">
        {/* Card Top Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-100/80 transition-colors">
              {icon}
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              {title}
            </span>
          </div>

          {badgeText && (
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${badgeStyles[badgeVariant]}`}>
              {badgeText}
            </span>
          )}
        </div>

        {/* Actionable Status Text */}
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-slate-900 leading-tight">
            {statusText}
          </h3>
          {detailMetric && (
            <div className="pt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight">{detailMetric}</span>
              {detailLabel && <span className="text-xs font-semibold text-slate-500">{detailLabel}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="mt-4 pt-2.5 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2">
          {technicalDetails && technicalDetails.length > 0 ? (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-slate-200/80"
            >
              <Info className="w-3 h-3 text-slate-400" />
              <span>{showDetails ? 'Hide details' : 'View details'}</span>
              {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : <div />}

          {onClickAction && actionText && (
            <button
              onClick={onClickAction}
              className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              <span>{actionText}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {showDetails && technicalDetails && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1.5 animate-in fade-in duration-200">
            {technicalDetails.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">{item.label}</span>
                <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

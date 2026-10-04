import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { BarChart3, TrendingDown, Sun, Droplets, Zap } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Federation Analytics & Resource Reporting"
        subtitle="Aggregate water savings, solar energy utilization, and grid cost reduction."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Minimal Water Consumption Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-600" />
              <span>Water Consumption Trend (kL)</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700">-40% vs Baseline</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
            {[45, 42, 38, 30, 28, 24, 22].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-sky-500 rounded-t-lg transition-all hover:bg-sky-600"
                  style={{ height: `${val * 3}px` }}
                />
                <span className="text-[10px] text-slate-400">W{idx + 1}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Minimal Solar Utilization Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Solar Energy Utilization (%)</span>
            </h3>
            <span className="text-xs font-bold text-amber-700">84.2% Peak Solar</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
            {[60, 68, 72, 80, 84, 88, 85].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-amber-500 rounded-t-lg transition-all hover:bg-amber-600"
                  style={{ height: `${val * 1.8}px` }}
                />
                <span className="text-[10px] text-slate-400">W{idx + 1}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

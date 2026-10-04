import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { BarChart3, TrendingDown, Sun, Droplets, Zap } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="FPO Federation Analytics & Resource Reporting"
        subtitle="Aggregate water savings, solar energy utilization, and climate risk mitigation across farm cluster."
        badge="124 Farms • 318 Acres"
      />

      {/* Overview Stat Cards (project_data.md Section 30 & 31) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <GlassCard className="p-4 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Water Usage</span>
          <div className="text-2xl font-black text-emerald-700">↓ 18%</div>
          <span className="text-[10px] text-slate-500">450L/day avg saved</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Energy Usage</span>
          <div className="text-2xl font-black text-emerald-700">↓ 14%</div>
          <span className="text-[10px] text-slate-500">0.42kWh/day avg saved</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Solar Utilization</span>
          <div className="text-2xl font-black text-emerald-700">↑ 27%</div>
          <span className="text-[10px] text-slate-500">Solar window alignment</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Healthy Farms</span>
          <div className="text-2xl font-black text-emerald-700">91%</div>
          <span className="text-[10px] text-slate-500">113 of 124 farms optimal</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Post-Harvest Loss</span>
          <div className="text-2xl font-black text-emerald-700">↓ 12%</div>
          <span className="text-[10px] text-slate-500">AgriVault storage tracking</span>
        </GlassCard>
      </div>

      {/* Mandatory Disclaimer Badge (project_data.md Section 31 & 52) */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-900">
        Illustrative simulation — not field-validated results
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Minimal Water Consumption Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>Water Consumption Trend (kL)</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700">-18% vs Baseline</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
            {[45, 42, 38, 30, 28, 24, 22].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-emerald-600 rounded-t-lg transition-all hover:bg-emerald-700"
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
              <Sun className="w-4 h-4 text-emerald-600" />
              <span>Solar Energy Utilization (%)</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700">+27% Solar Window Sync</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
            {[60, 68, 72, 80, 84, 88, 85].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
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

import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Network System Alerts"
        subtitle="Critical hardware warnings, weather alerts, and soil moisture drop notices across all member farms."
      />

      <div className="space-y-3">
        <GlassCard className="p-5 border-l-4 border-l-emerald-600 bg-emerald-50/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="flex justify-between items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm">Rooftop Solar Inverter Sync Interrupted</h4>
              <span className="text-[10px] text-slate-400">Dharmapuri Plot E • 15 mins ago</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Communication drop detected on Inverter Node 05. Pump automatically operating on grid backup.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-l-4 border-l-emerald-700 bg-emerald-100/30 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div>
            <div className="flex justify-between items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm">Low Water Tension Warning</h4>
              <span className="text-[10px] text-slate-400">Namakkal Plot C • 1 hour ago</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Soil moisture dropped to 24% during fruiting stage. Recommended scheduling targeted solar irrigation.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

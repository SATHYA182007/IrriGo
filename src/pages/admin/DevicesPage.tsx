import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Cpu, Wifi, Battery, RefreshCcw, ShieldCheck } from 'lucide-react';

export const DevicesPage: React.FC = () => {
  const { devices } = useFarm();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Connected Devices & IoT Telemetry Nodes"
        subtitle="Real-time connectivity health for field ESP32 gateways, soil probes, and solar inverters."
        badge="6 Devices Online"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => (
          <GlassCard key={device.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>{device.name}</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {device.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Battery Level</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" /> {device.batteryPercent}%
                </span>
              </div>

              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Signal Strength</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-sky-600" /> {device.signalStrength}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <span>Health Score: <strong className="text-emerald-700">{device.healthPercent}%</strong></span>
              <span>Synced: {device.lastSynced}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

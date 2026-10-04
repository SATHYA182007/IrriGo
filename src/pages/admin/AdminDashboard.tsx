import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Building2, Users, MapPin, Droplets, Sun, AlertTriangle, ShieldCheck, ArrowUpRight, Search } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();

  const farmNetworkData = [
    { id: 'f-1', farm: 'Salem West Plot A', farmer: 'Ravi Kumar', crop: 'Tomato', water: 'Optimal (28%)', energy: '100% Solar', cropHealth: 'Healthy', alert: 'None' },
    { id: 'f-2', farm: 'Cauvery River Basin B', farmer: 'Senthil Nathan', crop: 'Paddy / Rice', water: 'Saturated (72%)', energy: 'Solar + Grid', cropHealth: 'Healthy', alert: 'None' },
    { id: 'f-3', farm: 'Namakkal Hillside C', farmer: 'Meena Sundaram', crop: 'Banana', water: 'Dry (24%)', energy: 'Battery Solar', cropHealth: 'Attention', alert: 'Water Low' },
    { id: 'f-4', farm: 'Erode Organic Plot D', farmer: 'Karthik Raja', crop: 'Turmeric', water: 'Optimal (42%)', energy: '100% Solar', cropHealth: 'Healthy', alert: 'None' },
    { id: 'f-5', farm: 'Dharmapuri East E', farmer: 'Anitha Rajan', crop: 'Cotton', water: 'Dry (30%)', energy: 'Grid Backup', cropHealth: 'Monitor', alert: 'Solar Offline' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Cauvery Basin FPO Federation Network"
        subtitle="Aggregate farm telemetry, water efficiency metrics, and solar pump grid performance."
        badge="38 Active Farms"
      />

      {/* Top 6 KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Total Farmers</span>
          <div className="text-2xl font-black text-slate-900">38</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% Onboarded</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Total Acreage</span>
          <div className="text-2xl font-black text-slate-900">450</div>
          <span className="text-[10px] text-slate-500 font-bold">Acres Registered</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Active Sensors</span>
          <div className="text-2xl font-black text-emerald-700">142</div>
          <span className="text-[10px] text-emerald-600 font-bold">🟢 Online (98.2%)</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Water Saved</span>
          <div className="text-2xl font-black text-emerald-700">42.8 kL</div>
          <span className="text-[10px] text-emerald-600 font-bold">This Month</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Solar Offset</span>
          <div className="text-2xl font-black text-emerald-700">84.2%</div>
          <span className="text-[10px] text-emerald-600 font-bold">Pumping Clean Energy</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Active Alerts</span>
          <div className="text-2xl font-black text-emerald-800">2</div>
          <span className="text-[10px] text-emerald-700 font-bold">Requires Action</span>
        </GlassCard>
      </div>

      {/* Map-Style Farm Overview Mock */}
      <GlassCard className="p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>FPO Regional Farm Network Map Overview</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Cauvery Delta Cluster</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-900 text-white p-6 flex items-center justify-center border border-slate-800">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> Interactive FPO GIS Satellite Layer Syncing
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Displaying 38 smallholder parcels with active soil moisture heatmaps and rooftop solar inverter telematics.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Farm Performance Data Table */}
      <GlassCard className="p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
          <h3 className="text-lg font-bold text-slate-900">Registered Farm Performance Table</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter farmer or crop..."
              className="pl-9 pr-4 py-1.5 rounded-full border border-slate-200 text-xs text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">Farm Parcel</th>
                <th className="py-3 px-4">Farmer</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Soil Water</th>
                <th className="py-3 px-4">Energy Source</th>
                <th className="py-3 px-4">Health</th>
                <th className="py-3 px-4">Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {farmNetworkData.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.farm}</td>
                  <td className="py-3.5 px-4 font-medium">{row.farmer}</td>
                  <td className="py-3.5 px-4">{row.crop}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{row.water}</td>
                  <td className="py-3.5 px-4">{row.energy}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      row.cropHealth === 'Healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {row.cropHealth}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      row.alert === 'None' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {row.alert}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

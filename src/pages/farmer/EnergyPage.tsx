import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Sun, Battery, Zap, Droplets, Sprout, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const EnergyPage: React.FC = () => {
  const { energyData } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.navEnergy}
        subtitle="Zero-cost solar irrigation scheduling aligned with peak photovoltaic output."
        badge="Zero Grid Dependency"
      />

      {/* Main Solar Window AI Recommendation Banner */}
      <GlassCard variant="amber" className="p-8 space-y-4 border-2 border-amber-300">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Optimal Solar Pumping Window
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          "{t.solarWindowNotice}"
        </h2>

        <p className="text-sm text-slate-700 leading-relaxed">
          Running your 1.5HP water pump between 10:00 AM and 12:00 PM utilizes direct rooftop solar generation without drawing battery storage or paid grid power.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-amber-900">
          <span className="bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            ☀️ Current Irradiance: 812 W/m² (High)
          </span>
          <span className="bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            💰 Est. Daily Fuel Savings: ₹145
          </span>
        </div>
      </GlassCard>

      {/* Visual Energy Flow Diagram */}
      <GlassCard className="p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">{t.energyFlowTitle}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center justify-between text-center">
          {/* Node 1: Solar */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <Sun className="w-8 h-8 text-amber-500 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">{t.solarPower}</span>
            <span className="text-lg font-black text-amber-600">{energyData.solarGenerationKW} kW</span>
          </div>

          <div className="hidden sm:flex justify-center">
            <ArrowRight className="w-6 h-6 text-emerald-600 animate-pulse" />
          </div>

          {/* Node 2: Battery */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <Battery className="w-8 h-8 text-emerald-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">{t.batteryLevel}</span>
            <span className="text-lg font-black text-emerald-600">{energyData.batteryLevelPercent}%</span>
          </div>

          <div className="hidden sm:flex justify-center">
            <ArrowRight className="w-6 h-6 text-emerald-600 animate-pulse" />
          </div>

          {/* Node 3: Pump */}
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
            <Droplets className="w-8 h-8 text-sky-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">{t.pumpConsumption}</span>
            <span className="text-lg font-black text-sky-600">{energyData.pumpConsumptionKW} kW</span>
          </div>

          <div className="hidden sm:flex justify-center">
            <ArrowRight className="w-6 h-6 text-emerald-600 animate-pulse" />
          </div>

          {/* Node 4: Farm */}
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 sm:col-span-4 lg:col-span-1">
            <Sprout className="w-8 h-8 text-teal-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">Tomato Root Zone</span>
            <span className="text-xs font-bold text-teal-700">Hydrated</span>
          </div>
        </div>
      </GlassCard>

      {/* Energy Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Daily Solar Harvest</span>
          <div className="text-3xl font-black text-amber-600">{energyData.dailySolarEnergyKWh} kWh</div>
          <p className="text-xs text-slate-600">Peak window: {energyData.peakSolarWindow}</p>
        </GlassCard>

        <GlassCard className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Grid & Diesel Power</span>
          <div className="text-3xl font-black text-emerald-700">0.0 kW</div>
          <p className="text-xs text-slate-600">100% Off-grid solar operation today</p>
        </GlassCard>

        <GlassCard className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Energy Savings</span>
          <div className="text-3xl font-black text-emerald-700">{energyData.estimatedEnergySavingsPercent}%</div>
          <p className="text-xs text-slate-600">Compared to conventional diesel pumping</p>
        </GlassCard>
      </div>
    </div>
  );
};

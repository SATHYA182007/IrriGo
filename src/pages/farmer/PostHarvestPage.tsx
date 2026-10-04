import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Package, Truck, Store, Sprout, Thermometer, Droplets, ArrowRight, ShieldCheck } from 'lucide-react';

export const PostHarvestPage: React.FC = () => {
  const { harvestItems } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.navPostHarvest}
        subtitle="Crop harvest readiness scoring, cold storage telematics, and market dispatch optimization."
        badge="AgriVault Storage"
      />

      {/* Visual Flow: Farm -> Harvest -> Storage -> Transport -> Market */}
      <GlassCard variant="emerald" className="p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Post-Harvest Value Chain Flow</h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center justify-between text-center">
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1">
            <Sprout className="w-6 h-6 text-emerald-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">Farm</span>
            <span className="text-[10px] text-slate-500">Field A & B</span>
          </div>

          <div className="hidden sm:block text-slate-400">→</div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1">
            <Package className="w-6 h-6 text-amber-500 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">Harvest</span>
            <span className="text-[10px] text-amber-700 font-bold">82% Ready</span>
          </div>

          <div className="hidden sm:block text-slate-400">→</div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1">
            <Thermometer className="w-6 h-6 text-sky-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">Storage</span>
            <span className="text-[10px] text-slate-500">18°C / 72% RH</span>
          </div>

          <div className="hidden sm:block text-slate-400">→</div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1">
            <Truck className="w-6 h-6 text-indigo-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">Transport</span>
            <span className="text-[10px] text-indigo-700 font-bold">Priority Dispatch</span>
          </div>

          <div className="hidden sm:block text-slate-400">→</div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1 sm:col-span-5 lg:col-span-1">
            <Store className="w-6 h-6 text-teal-600 mx-auto" />
            <span className="text-xs font-bold text-slate-800 block">Market</span>
            <span className="text-[10px] text-emerald-700 font-bold">Optimal Price</span>
          </div>
        </div>
      </GlassCard>

      {/* Main Dispatch AI Priority Card */}
      <GlassCard className="p-6 md:p-8 space-y-4 border-l-4 border-l-emerald-600">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-slate-500 uppercase">AgriVault Logistics Recommendation</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          “Harvest within 3–5 days. Prioritize dispatch to the nearest buyer because shelf life is decreasing.”
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          Storage telematics show Field A tomatoes are at 82% harvest maturity with 6 days remaining shelf life in cold storage (18°C / 72% RH). Scheduling priority transport to Salem APMC market reduces post-harvest loss by 12%.
        </p>
      </GlassCard>

      {/* Harvest Items Table / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {harvestItems.map(item => (
          <GlassCard key={item.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">{item.fieldName}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Priority: {item.dispatchPriority}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">{item.crop}</h4>
              <p className="text-xs text-slate-500">Est. Harvest: {item.estimatedHarvestWindow}</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Harvest Readiness</span>
                <span className="text-emerald-700">{item.readinessPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${item.readinessPercent}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Storage Temp & RH</span>
                <span className="font-bold text-slate-800">{item.storageTemperature}°C / {item.storageHumidity}%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Est. Shelf Life</span>
                <span className="font-bold text-slate-800">{item.estimatedShelfLifeDays} Days</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

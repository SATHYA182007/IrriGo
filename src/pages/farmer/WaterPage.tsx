import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import {
  Droplets,
  CheckCircle2,
  XCircle,
  Clock,
  Sun,
  ShieldCheck,
  Play,
  ChevronDown,
  ChevronUp,
  BarChart2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const WaterPage: React.FC = () => {
  const { sensorData, recommendation, triggerIrrigation, isIrrigating } = useFarm();
  const { t } = useLanguage();
  const [showWhy, setShowWhy] = useState(true);

  const isIrrigateYes = recommendation.status === 'REQUIRED';

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.navWater}
        subtitle="Precision soil moisture telemetry and automated drip irrigation scheduling."
        badge="Resource Goal: -40% Water Waste"
      />

      {/* Main Flagship Card: "Should I irrigate?" */}
      <GlassCard
        variant={isIrrigateYes ? 'emerald' : 'amber'}
        className="p-8 space-y-6 border-2"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Today's Decision Engine Output
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              {t.shouldIIrrigate}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-black px-6 py-2 rounded-2xl shadow-md border ${
                isIrrigateYes
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-amber-500 text-white border-amber-400'
              }`}
            >
              {isIrrigateYes ? 'YES' : 'NO'}
            </span>
          </div>
        </div>

        {/* Decision Summary */}
        <p className="text-base text-slate-700 font-medium">
          {recommendation.headline}
        </p>

        {/* Key Operational Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/90 rounded-2xl border border-emerald-200/80">
            <div className="text-xs text-slate-500 font-medium">{t.recTime}</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">{recommendation.recommendedTime}</div>
          </div>

          <div className="p-4 bg-white/90 rounded-2xl border border-emerald-200/80">
            <div className="text-xs text-slate-500 font-medium">{t.recDuration}</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {recommendation.durationMinutes > 0 ? `${recommendation.durationMinutes} minutes` : '0 min'}
            </div>
          </div>

          <div className="p-4 bg-white/90 rounded-2xl border border-emerald-200/80">
            <div className="text-xs text-slate-500 font-medium">{t.recWaterAmount}</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {recommendation.estimatedWaterLiters > 0 ? `${recommendation.estimatedWaterLiters} Liters` : '0 Liters (Saved)'}
            </div>
          </div>
        </div>

        {/* "Why?" Expandable Checklist Section */}
        <div className="pt-4 border-t border-slate-200/80">
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Why is AgriPulse recommending this?</span>
            {showWhy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showWhy && (
            <div className="mt-4 p-4 rounded-2xl bg-white/90 border border-emerald-100 text-xs text-slate-700 space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soil moisture is at {sensorData.soilMoisture}% (below target 35% threshold)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rain probability for next 24 hours is low (12%)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tomato crops in Field A are in high-transpiration Fruiting stage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Water storage tank has {sensorData.waterTankLevel}% reserve capacity</span>
              </div>
            </div>
          )}
        </div>

        {/* Start Button */}
        {isIrrigateYes && (
          <div className="pt-2">
            <button
              onClick={triggerIrrigation}
              disabled={isIrrigating}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isIrrigating ? 'Irrigating Now...' : t.startIrrigation}</span>
            </button>
          </div>
        )}
      </GlassCard>

      {/* Water Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Soil Condition</span>
          <div className="text-3xl font-black text-emerald-700">{sensorData.soilMoisture}%</div>
          <p className="text-xs text-slate-600">Root Zone Moisture (Field A)</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${sensorData.soilMoisture}%` }} />
          </div>
        </GlassCard>

        <GlassCard className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Water Tank Capacity</span>
          <div className="text-3xl font-black text-sky-700">{sensorData.waterTankLevel}%</div>
          <p className="text-xs text-slate-600">3,400L Available Reserve</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div className="bg-sky-600 h-2 rounded-full" style={{ width: `${sensorData.waterTankLevel}%` }} />
          </div>
        </GlassCard>

        <GlassCard className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Today's Water Use</span>
          <div className="text-3xl font-black text-slate-900">0 L</div>
          <p className="text-xs text-slate-600">Weekly Total: 1,680 L (Optimal)</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-2">
            <ShieldCheck className="w-3.5 h-3.5" /> 38% Less water vs traditional schedule
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

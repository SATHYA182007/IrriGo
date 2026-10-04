import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { ShieldCheck, CloudRain, Sun, Flame, Wind, Droplets, AlertTriangle } from 'lucide-react';

export const ClimatePage: React.FC = () => {
  const { weatherData } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.navClimate}
        subtitle="Hyper-local weather radar and adaptive climate risk management."
        badge="Adaptive Resilience"
      />

      {/* Climate Risk Action Cards (project_data.md Section 24) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard variant="emerald" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <Flame className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Medium Risk
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">{t.heatRisk}</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            High temperature expected tomorrow (34°C). Maintain root zone moisture in morning solar window.
          </p>
        </GlassCard>

        <GlassCard variant="emerald" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <CloudRain className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
              High Risk (80%)
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">{t.rainRisk}</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Heavy rain expected Wednesday & Thursday. Avoid unnecessary irrigation before rainfall.
          </p>
        </GlassCard>

        <GlassCard variant="subtle" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <Droplets className="w-5 h-5 text-teal-600" />
            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Medium Risk
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">{t.drySpellRisk}</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            3-Day dry window following rainfall. Water tank capacity at 68% guarantees sufficient irrigation supply.
          </p>
        </GlassCard>

        <GlassCard variant="emerald" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Low Risk
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Crop Stress</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Transpiration index optimal for Tomato Flowering stage. Zero heat shock detected.
          </p>
        </GlassCard>
      </div>

      {/* 7-Day Visual Forecast Cards */}
      <GlassCard className="p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">7-Day Hyper-Local Forecast (Tamil Nadu)</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherData.forecast.map((f, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border text-center space-y-1.5 ${
                f.day === 'Mon'
                  ? 'bg-emerald-50 border-emerald-300 font-bold'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs font-bold text-slate-500 block">{f.day}</span>
              {f.condition === 'sunny' && <Sun className="w-6 h-6 text-emerald-600 mx-auto" />}
              {f.condition === 'cloudy' && <Sun className="w-6 h-6 text-slate-400 mx-auto" />}
              {f.condition === 'rainy' && <CloudRain className="w-6 h-6 text-emerald-600 mx-auto" />}
              {f.condition === 'partly-cloudy' && <Sun className="w-6 h-6 text-emerald-600 mx-auto" />}
              <div className="text-sm font-extrabold text-slate-900">{f.tempHigh}°C</div>
              <div className="text-[11px] text-slate-400">{f.tempLow}°C</div>
              <div className="text-[10px] text-emerald-700 font-bold">Rain {f.rainProb}%</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

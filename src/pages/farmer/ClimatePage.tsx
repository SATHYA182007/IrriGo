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

      {/* Climate Risk Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard variant="amber" className="space-y-3">
          <div className="flex items-center justify-between">
            <Flame className="w-6 h-6 text-amber-600" />
            <span className="text-[10px] font-black uppercase bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
              Moderate Risk
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t.heatRisk}</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            🔥 High temperature expected tomorrow (34°C). Increase root zone monitoring and shift pumping to cool morning solar window (10:00 AM).
          </p>
        </GlassCard>

        <GlassCard variant="blue" className="space-y-3">
          <div className="flex items-center justify-between">
            <CloudRain className="w-6 h-6 text-sky-600" />
            <span className="text-[10px] font-black uppercase bg-sky-200 text-sky-900 px-2.5 py-0.5 rounded-full">
              Low Today • High Thursday
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t.rainRisk}</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            🌧️ 75% Rain expected Thursday. AgriPulse will automatically postpone Thursday irrigation to let nature irrigate your farm.
          </p>
        </GlassCard>

        <GlassCard variant="subtle" className="space-y-3">
          <div className="flex items-center justify-between">
            <Droplets className="w-6 h-6 text-teal-600" />
            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
              Controlled
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t.drySpellRisk}</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            🌱 3-Day dry window ahead. Water tank capacity at 68% guarantees sufficient irrigation supply.
          </p>
        </GlassCard>
      </div>

      {/* 7-Day Visual Forecast Cards */}
      <GlassCard className="p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">7-Day Hyper-Local Forecast</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherData.forecast.map((f, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border text-center space-y-1.5 ${
                f.day === 'Today'
                  ? 'bg-emerald-50 border-emerald-300 font-bold'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs font-bold text-slate-500 block">{f.day}</span>
              {f.condition === 'sunny' && <Sun className="w-6 h-6 text-amber-500 mx-auto" />}
              {f.condition === 'cloudy' && <Sun className="w-6 h-6 text-slate-400 mx-auto" />}
              {f.condition === 'rainy' && <CloudRain className="w-6 h-6 text-sky-600 mx-auto" />}
              {f.condition === 'partly-cloudy' && <Sun className="w-6 h-6 text-amber-400 mx-auto" />}
              <div className="text-sm font-extrabold text-slate-900">{f.tempHigh}°</div>
              <div className="text-[11px] text-slate-400">{f.tempLow}°</div>
              <div className="text-[10px] text-sky-600 font-bold">💧 {f.rainProb}%</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

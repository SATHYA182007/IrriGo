import React from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { GlassCard } from '../components/GlassCard';
import { evaluateAgriPulseRules } from '../services/recommendationEngine';
import { Sliders, Sparkles, RefreshCcw, CloudRain, Sun, Droplets, Thermometer, Sprout, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const SimulatorPage: React.FC = () => {
  const { simulationParams, updateSimulation, resetSimulation } = useFarm();
  const { t } = useLanguage();

  const currentRec = evaluateAgriPulseRules(simulationParams);

  // Quick Hackathon Demo Presets
  const applyPreset = (preset: 'drought' | 'monsoon' | 'optimal') => {
    if (preset === 'drought') {
      updateSimulation({
        soilMoisture: 22,
        temperature: 38,
        rainProbability: 5,
        solarAvailability: 92,
        waterLevel: 75,
        cropGrowthStage: 'Fruiting'
      });
    } else if (preset === 'monsoon') {
      updateSimulation({
        soilMoisture: 58,
        temperature: 26,
        rainProbability: 85,
        solarAvailability: 20,
        waterLevel: 90,
        cropGrowthStage: 'Vegetative'
      });
    } else {
      updateSimulation({
        soilMoisture: 52,
        temperature: 30,
        rainProbability: 15,
        solarAvailability: 80,
        waterLevel: 80,
        cropGrowthStage: 'Germination'
      });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      <PageHeader
        title={t.simulatorTitle}
        subtitle={t.simulatorSubtitle}
        badge="Hackathon Interactive Module"
        action={
          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset Parameters</span>
          </button>
        }
      />

      {/* Preset Quick Buttons for Hackathon Judges */}
      <GlassCard variant="emerald" className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800">Quick Climate Presets for Demonstration:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('drought')}
            className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer"
          >
            Dry Summer (High Solar + Low Moisture)
          </button>
          <button
            onClick={() => applyPreset('monsoon')}
            className="px-3 py-1.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-200 transition-colors cursor-pointer"
          >
            Heavy Monsoon (85% Rain Forecast)
          </button>
          <button
            onClick={() => applyPreset('optimal')}
            className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            Healthy Moisture (No Action Needed)
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard className="p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              <span>Simulated Environmental Factors</span>
            </h3>

            {/* Slider 1: Soil Moisture */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600" /> {t.soilMoisture}
                </span>
                <span className="font-mono font-black text-emerald-700 text-sm">{simulationParams.soilMoisture}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={simulationParams.soilMoisture}
                onChange={e => updateSimulation({ soilMoisture: Number(e.target.value) })}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Severe Dry (&lt;25%)</span>
                <span>Optimal (45-60%)</span>
                <span>Saturated (&gt;80%)</span>
              </div>
            </div>

            {/* Slider 2: Rain Probability */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-indigo-600" /> {t.rainProbability}
                </span>
                <span className="font-mono font-black text-indigo-700 text-sm">{simulationParams.rainProbability}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simulationParams.rainProbability}
                onChange={e => updateSimulation({ rainProbability: Number(e.target.value) })}
                className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Clear Sky (0%)</span>
                <span>Light Rain (30%)</span>
                <span>Heavy Rain (&gt;60%)</span>
              </div>
            </div>

            {/* Slider 3: Solar Availability */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" /> {t.solarAvailability}
                </span>
                <span className="font-mono font-black text-amber-600 text-sm">{simulationParams.solarAvailability}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={simulationParams.solarAvailability}
                onChange={e => updateSimulation({ solarAvailability: Number(e.target.value) })}
                className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Overcast (10%)</span>
                <span>Moderate (50%)</span>
                <span>Peak Noon (90%+)</span>
              </div>
            </div>

            {/* Slider 4: Air Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-rose-500" /> {t.temperature}
                </span>
                <span className="font-mono font-black text-rose-600 text-sm">{simulationParams.temperature}°C</span>
              </div>
              <input
                type="range"
                min="18"
                max="45"
                value={simulationParams.temperature}
                onChange={e => updateSimulation({ temperature: Number(e.target.value) })}
                className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 5: Water Tank Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-teal-600" /> {t.waterTankLevel}
                </span>
                <span className="font-mono font-black text-teal-700 text-sm">{simulationParams.waterLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={simulationParams.waterLevel}
                onChange={e => updateSimulation({ waterLevel: Number(e.target.value) })}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Select 6: Crop Growth Stage */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" /> {t.growthStage}
              </label>
              <select
                value={simulationParams.cropGrowthStage}
                onChange={e => updateSimulation({ cropGrowthStage: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="Germination">Germination Stage (Low Water)</option>
                <option value="Vegetative">Vegetative Growth (Moderate Water)</option>
                <option value="Fruiting">Fruiting Stage (High Water Need)</option>
                <option value="Harvest Ready">Harvest Ready (Tapering Off)</option>
              </select>
            </div>
          </GlassCard>
        </div>

        {/* Dynamic Engine Output Result Panel */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            key={currentRec.id + currentRec.status}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl p-6 md:p-8 text-white shadow-2xl space-y-6 border ${
              currentRec.status === 'REQUIRED'
                ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border-emerald-700'
                : currentRec.status === 'POSTPONED'
                ? 'bg-gradient-to-br from-amber-900 to-amber-800 border-amber-700'
                : 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Live Engine Output
              </span>
              <span className="text-xs font-bold text-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> {currentRec.confidencePercent}% Confidence
              </span>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                {currentRec.headline}
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                {currentRec.description}
              </p>
            </div>

            {/* Generated Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
                <span className="text-[10px] text-emerald-200 font-bold uppercase block">Time</span>
                <span className="text-sm font-bold">{currentRec.recommendedTime}</span>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
                <span className="text-[10px] text-emerald-200 font-bold uppercase block">Est. Water</span>
                <span className="text-sm font-bold">
                  {currentRec.estimatedWaterLiters > 0 ? `${currentRec.estimatedWaterLiters} Liters` : '0 Liters'}
                </span>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/15 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-emerald-200 font-bold uppercase block">Energy Source</span>
                <span className="text-sm font-bold">{currentRec.energySource}</span>
              </div>
            </div>

            {/* Decision Rule Explanations */}
            <div className="space-y-2 pt-3 border-t border-white/15">
              <span className="text-xs font-bold text-emerald-200">Rule Logic Evaluation:</span>
              <div className="space-y-2 text-xs">
                {currentRec.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <GlassCard className="p-5 text-xs text-slate-500 space-y-2">
            <span className="font-bold text-slate-700">Agronomic Rule Engine Architecture:</span>
            <p>
              AgriPulse AI uses deterministic decision rules built on crop evapotranspiration coefficients, soil water tension limits, and solar irradiance thresholds to ensure zero unnecessary pumping.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

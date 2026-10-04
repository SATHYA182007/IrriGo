import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Clock, Droplets, SunMedium, Play, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const AIRecommendationCard: React.FC = () => {
  const { recommendation, triggerIrrigation, isIrrigating } = useFarm();
  const { t } = useLanguage();
  const [showReasons, setShowReasons] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border border-emerald-300/80 shadow-md relative overflow-hidden text-slate-900"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 bg-emerald-100/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-300/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-950">
            {t.heroAiRecTitle} • AgriPulse Engine
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[11px] font-extrabold text-slate-800">
            {recommendation.confidencePercent}% Confidence Score
          </span>
        </div>
      </div>

      {/* Main Headline & Description */}
      <div className="mb-5 space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          {recommendation.headline}
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm font-medium max-w-3xl leading-relaxed">
          {recommendation.description}
        </p>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        <div className="bg-white p-3.5 rounded-xl border border-emerald-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-extrabold mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="uppercase tracking-wider">{t.recTime}</span>
          </div>
          <p className="text-base font-black text-slate-900">{recommendation.recommendedTime}</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-emerald-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-extrabold mb-1">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span className="uppercase tracking-wider">{t.recWaterAmount}</span>
          </div>
          <p className="text-base font-black text-slate-900">
            {recommendation.estimatedWaterLiters > 0 ? `${recommendation.estimatedWaterLiters} Liters` : '0 Liters (Saved)'}
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-emerald-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-extrabold mb-1">
            <SunMedium className="w-3.5 h-3.5 text-amber-500" />
            <span className="uppercase tracking-wider">{t.recEnergySource}</span>
          </div>
          <p className="text-base font-black text-slate-900">{recommendation.energySource}</p>
        </div>
      </div>

      {/* Actions & Reasoning Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-emerald-200/80">
        <div className="flex flex-wrap items-center gap-3">
          {recommendation.status === 'REQUIRED' && (
            <button
              onClick={triggerIrrigation}
              disabled={isIrrigating}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-full font-bold text-xs transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isIrrigating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Droplets className="w-4 h-4" />
                  </motion.div>
                  <span>Irrigating Farm...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{t.startIrrigation}</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setShowReasons(!showReasons)}
            className="flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-950 px-4 py-2.5 rounded-full text-xs font-extrabold border border-emerald-300 transition-colors cursor-pointer shadow-2xs"
          >
            <span>{t.whyThisRec}</span>
            {showReasons ? <ChevronUp className="w-3.5 h-3.5 text-emerald-700" /> : <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />}
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-bold bg-white/80 px-3 py-1 rounded-full border border-slate-200">
          Powered by Soil + Solar + Satellite Sync
        </div>
      </div>

      {/* Expandable Reasons Checklist */}
      {showReasons && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4.5 rounded-2xl bg-white border border-emerald-300 text-xs text-slate-700 space-y-2.5 shadow-sm"
        >
          <div className="font-black text-xs text-slate-900 mb-1 uppercase tracking-wider">
            AgriPulse AI Decision Reasoning:
          </div>
          {recommendation.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-800 text-xs font-semibold leading-relaxed">{reason}</span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

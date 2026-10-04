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
      className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-emerald-50/90 via-teal-50/30 to-white border border-emerald-200/90 shadow-sm relative overflow-hidden text-slate-900"
    >
      {/* Background Subtle Gradient Wave */}
      <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
        <div className="flex items-center gap-2 bg-emerald-100/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-200/80">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900">
            {t.heroAiRecTitle} • AgriPulse Engine
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/90 px-3 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[11px] font-extrabold text-slate-700">
            {recommendation.confidencePercent}% Confidence
          </span>
        </div>
      </div>

      {/* Main Headline & Description */}
      <div className="mb-4 space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {recommendation.headline}
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-3xl leading-relaxed">
          {recommendation.description}
        </p>
      </div>

      {/* Key Metric Cards — CLEAN LIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold mb-0.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.recTime}</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{recommendation.recommendedTime}</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold mb-0.5">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.recWaterAmount}</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">
            {recommendation.estimatedWaterLiters > 0 ? `${recommendation.estimatedWaterLiters} Liters` : '0 Liters (Saved)'}
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold mb-0.5">
            <SunMedium className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.recEnergySource}</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{recommendation.energySource}</p>
        </div>
      </div>

      {/* Actions & Reasoning Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-100">
        <div className="flex flex-wrap items-center gap-2.5">
          {recommendation.status === 'REQUIRED' && (
            <button
              onClick={triggerIrrigation}
              disabled={isIrrigating}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-full font-bold text-xs transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isIrrigating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Droplets className="w-3.5 h-3.5" />
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
            className="flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-900 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
          >
            <span>{t.whyThisRec}</span>
            {showReasons ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-semibold">
          Powered by Soil + Solar + Satellite Sync
        </div>
      </div>

      {/* Expandable Reasons Checklist */}
      {showReasons && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700 space-y-2 shadow-2xs"
        >
          <div className="font-extrabold text-xs text-slate-900 mb-1">
            AgriPulse Decision Reasoning:
          </div>
          {recommendation.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 text-xs font-medium leading-relaxed">{reason}</span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

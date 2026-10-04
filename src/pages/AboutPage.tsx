import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { GlassCard } from '../components/GlassCard';
import { Sprout, Cpu, Sun, Droplets, ShieldCheck, Layers, CheckCircle2, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-6">
      <PageHeader
        title="About AgriPulse AI & IrriGo"
        subtitle="Bridging sensor telemetry, weather forecasts, and renewable solar energy for Indian smallholders."
        badge="Sustainability Challenge Prototype"
      />

      {/* Mission */}
      <GlassCard variant="emerald" className="p-8 md:p-12 space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Our Mission: “Don’t show the farmer data. Show the farmer what to do.”
        </h2>
        <p className="text-slate-700 text-sm md:text-base leading-relaxed max-w-4xl">
          India is home to over 120 million smallholder farmers managing less than 2 hectares of land each. While IoT sensors and weather APIs exist, most solutions dump complex charts onto farmers. IrriGo provides a simple digital assistant that synthesizes soil moisture, rain probability, and solar inverter telemetry into one clear daily instruction.
        </p>
      </GlassCard>

      {/* System Architecture */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">System Architecture & Data Pipeline</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GlassCard className="space-y-3">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl w-fit font-bold border border-emerald-200">1. Sense</div>
            <h4 className="font-bold text-slate-800">IoT Telemetry</h4>
            <p className="text-xs text-slate-600">ESP32 soil moisture nodes, ultrasonic tank gauges, and rooftop solar inverter telemetry.</p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="p-3 bg-teal-100 text-teal-950 rounded-xl w-fit font-bold border border-teal-200">2. Sync</div>
            <h4 className="font-bold text-slate-800">Weather & Satellite</h4>
            <p className="text-xs text-slate-600">Hyper-local precipitation radar and Sentinel-2 NDVI satellite crop vigor feeds.</p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl w-fit font-bold border border-emerald-300">3. Synthesize</div>
            <h4 className="font-bold text-slate-800">AgriPulse Engine</h4>
            <p className="text-xs text-slate-600">Deterministic agronomic rule evaluation evaluating water need against peak solar hours.</p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl w-fit font-bold border border-emerald-200">4. Empower</div>
            <h4 className="font-bold text-slate-800">Farmer Decision</h4>
            <p className="text-xs text-slate-600">Actionable vernacular notification & manual or automated pump control.</p>
          </GlassCard>
        </div>
      </section>

      {/* Complementing Infrastructure Notice */}
      <GlassCard className="p-6 md:p-8 space-y-3 bg-slate-900 text-white border-slate-800">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Layers className="w-5 h-5" />
          <span>Complementing Existing Infrastructure</span>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          IrriGo is designed to complement existing agricultural energy and irrigation setups (such as PM-KUSUM solar pumps and drip systems) rather than replace them. It integrates seamlessly via open API endpoints and ESP32 gateway controllers.
        </p>
      </GlassCard>
    </div>
  );
};

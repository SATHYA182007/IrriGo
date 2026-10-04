import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { WordTransition } from '../components/WordTransition';
import { AnimatedScrollText } from '../components/AnimatedScrollText';
import { AIFarmBackground } from '../components/AIFarmBackground';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn } from '../animations/variants';
import {
  Droplets,
  Sun,
  ShieldCheck,
  Package,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CloudRain,
  ChevronRight,
  ChevronDown,
  Bot,
  Zap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleHeroAction = () => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/farmer');
    } else {
      navigate('/auth/signup');
    }
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden bg-[#FAFFFC]">
      {/* HERO SECTION WITH ANIMATED AGRICULTURE BACKGROUND & STABLE MAIN H1 WORD TRANSITION */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between items-center py-12 border-b border-emerald-100/70 overflow-hidden">
        {/* Animated AI Farmland Video & Canvas 60FPS Background */}
        <AIFarmBackground />


        <div className="relative z-10 my-auto max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 w-full">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-4xl mx-auto"
          >
            {/* Top Tag */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-900 border border-emerald-300/90 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>AI-Powered Sustainable Agriculture Platform</span>
            </motion.div>

            {/* MAIN LANDING PAGE H1 HEADLINE WITH FIXED-HEIGHT WORD TRANSITION (NO LAYOUT SHIFT) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight space-y-2">
              <div>Smarter Farming.</div>
              <div className="h-[1.25em] flex items-center justify-center text-emerald-700">
                <WordTransition
                  words={["Less Water.", "Cleaner Energy.", "Higher Yields.", "Climate Shield."]}
                  interval={2400}
                  className="text-emerald-700"
                />
              </div>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-semibold leading-relaxed max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleHeroAction}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.heroCtaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#how-it-works"
                className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 px-7 py-3.5 rounded-full font-bold text-base transition-all shadow-2xs"
              >
                <span>{t.heroCtaSecondary}</span>
              </a>

              <Link
                to="/simulator"
                className="flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-300 px-6 py-3.5 rounded-full font-extrabold text-sm hover:bg-emerald-100 transition-all shadow-2xs"
              >
                <Zap className="w-4 h-4 text-emerald-700" />
                <span>Try Farm Simulator</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-800 font-bold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" /> 40% Water Savings
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" /> Zero Energy Waste
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" /> Native Vernacular Support
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <a
          href="#core-challenge"
          className="relative z-10 pt-4 text-slate-600 hover:text-emerald-800 transition-colors flex flex-col items-center gap-1 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-700" />
        </a>
      </section>

      {/* PROBLEM SECTION WITH SCROLL ANIMATIONS */}
      <section id="core-challenge" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            The Core Challenge
          </span>

          {/* Animated Scroll Text for Heading */}
          <AnimatedScrollText
            text="“Farmers don’t need more data. They need better decisions.”"
            className="text-3xl sm:text-4xl font-black text-slate-900"
          />

          <p className="text-base text-slate-600 font-medium pt-2">
            Traditional dashboards flood smallholders with complex telemetry graphs. AgriPulse converts raw data directly into clear action.
          </p>
        </div>

        {/* Animated Staggered Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: "Water Waste",
              desc: "Unnecessary irrigation wastes precious freshwater and depletes local groundwater tables.",
              icon: Droplets,
              badge: "40% Loss"
            },
            {
              title: "Energy Deficit",
              desc: "Poor pump scheduling increases grid electricity costs and reliance on expensive diesel generators.",
              icon: Sun,
              badge: "High Fuel Costs"
            },
            {
              title: "Climate Shocks",
              desc: "Irregular rainfall patterns and severe heat spells render traditional seasonal calendars unreliable.",
              icon: CloudRain,
              badge: "Unpredictable"
            },
            {
              title: "Post-Harvest Loss",
              desc: "Poor storage conditions and sub-optimal harvest timing directly degrade farmer crop revenues.",
              icon: Package,
              badge: "15-25% Rot"
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div key={idx} variants={scaleIn}>
                <GlassCard className="space-y-3 p-6 bg-white border border-emerald-100 shadow-2xs hover:-translate-y-1 transition-transform">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{card.desc}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* SOLUTION SECTION — INTERACTIVE DATA FLOW WITH ANIMATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GlassCard className="p-8 md:p-12 text-center space-y-8 bg-gradient-to-br from-emerald-50/90 via-teal-50/30 to-white border border-emerald-200/90 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
              Unified Agri Intelligence
            </span>
            <AnimatedScrollText
              text="One intelligent layer for the entire farm."
              className="text-3xl font-black text-slate-900"
            />
          </div>

          {/* Animated Data Flow Diagram */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 items-center justify-center my-8"
          >
            {['Soil Sensors', 'Weather Radar', 'Satellite NDVI', 'Solar Inverters', 'Water Gauges', 'Crop Phenology'].map((source, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-3 rounded-xl bg-white border border-emerald-200/80 text-xs font-bold text-slate-800 shadow-2xs hover:border-emerald-400 transition-colors"
              >
                {source}
              </motion.div>
            ))}
          </motion.div>

          {/* Animated AI Engine Center */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="p-5 rounded-2xl bg-emerald-800 text-white shadow-md max-w-sm w-full mx-auto border border-emerald-600"
            >
              <div className="flex items-center justify-center gap-2 font-extrabold text-lg">
                <Bot className="w-5 h-5 text-emerald-300" />
                <span>AgriPulse AI Engine</span>
              </div>
              <p className="text-[11px] text-emerald-100 font-medium mt-1">
                Rule-Based + ML agronomic synthesis
              </p>
            </motion.div>

            <ArrowRight className="w-6 h-6 text-emerald-700 rotate-90" />

            <div className="bg-white text-emerald-900 border border-emerald-300 px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-2xs max-w-md">
              "Irrigate tomorrow at 10:30 AM for 35 minutes"
            </div>
          </div>
        </GlassCard>
      </section>

      {/* FOUR CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            Core Platform Pillars
          </span>
          <AnimatedScrollText
            text="Engineered for farm resource resilience."
            className="text-3xl sm:text-4xl font-black text-slate-900"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Pillar 1: Smart Water */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-8 space-y-4 bg-white border border-emerald-100 shadow-2xs hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Smart Water</h3>
                <p className="text-sm font-semibold text-emerald-800">“Use only the water your crop needs.”</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">✓ Soil moisture threshold monitoring</li>
                <li className="flex items-center gap-2">✓ Precise irrigation recommendations</li>
                <li className="flex items-center gap-2">✓ Rainfall awareness overrides</li>
                <li className="flex items-center gap-2">✓ Daily and weekly water usage tracking</li>
              </ul>
              <Link to="/auth/signin" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                Sign In for Water Intelligence <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </motion.div>

          {/* Pillar 2: Smart Energy */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-8 space-y-4 bg-white border border-emerald-100 shadow-2xs hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Smart Energy</h3>
                <p className="text-sm font-semibold text-emerald-800">“Use renewable energy when it matters most.”</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">✓ Real-time solar availability tracking</li>
                <li className="flex items-center gap-2">✓ Solar-pump schedule optimization</li>
                <li className="flex items-center gap-2">✓ Battery storage & grid backup balance</li>
                <li className="flex items-center gap-2">✓ Measured electricity & diesel cost savings</li>
              </ul>
              <Link to="/auth/signin" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                Sign In for Solar Energy <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </motion.div>

          {/* Pillar 3: Climate Shield */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-8 space-y-4 bg-white border border-emerald-100 shadow-2xs hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Climate Shield</h3>
                <p className="text-sm font-semibold text-emerald-800">“Prepare before climate stress arrives.”</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">✓ 7-day hyper-local rainfall forecasting</li>
                <li className="flex items-center gap-2">✓ Heat stress alerts & canopy protection</li>
                <li className="flex items-center gap-2">✓ Dry spell duration predictions</li>
                <li className="flex items-center gap-2">✓ Adaptive pre-irrigation schedules</li>
              </ul>
              <Link to="/auth/signin" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                Sign In for Climate Shield <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </motion.div>

          {/* Pillar 4: AgriVault */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-8 space-y-4 bg-white border border-emerald-100 shadow-2xs hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">AgriVault Storage</h3>
                <p className="text-sm font-semibold text-emerald-800">“Protect produce after harvest.”</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">✓ Crop harvest readiness scoring</li>
                <li className="flex items-center gap-2">✓ Cold storage temperature monitoring</li>
                <li className="flex items-center gap-2">✓ Dynamic shelf-life estimation</li>
                <li className="flex items-center gap-2">✓ Dispatch & logistics priority guidance</li>
              </ul>
              <Link to="/auth/signin" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                Sign In for AgriVault Storage <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* IMPACT SECTION WITH ANIMATED COUNTERS */}
      <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl"
        >
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-400/30">
              Measured Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Proven resource savings for Indian smallholders.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-2 border-emerald-500 pl-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">40%</span>
              <p className="text-xs font-bold text-slate-300 uppercase">Water Optimized</p>
              <p className="text-[11px] text-slate-400">Reduced freshwater extraction per acre</p>
            </div>

            <div className="border-l-2 border-emerald-400 pl-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">35%</span>
              <p className="text-xs font-bold text-slate-300 uppercase">Energy Optimized</p>
              <p className="text-[11px] text-slate-400">Pumping powered by free solar hours</p>
            </div>

            <div className="border-l-2 border-teal-500 pl-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-teal-400">92%</span>
              <p className="text-xs font-bold text-slate-300 uppercase">Crop Protected</p>
              <p className="text-[11px] text-slate-400">Prevention of severe water stress</p>
            </div>

            <div className="border-l-2 border-teal-400 pl-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-teal-400">25%</span>
              <p className="text-xs font-bold text-slate-300 uppercase">Loss Reduced</p>
              <p className="text-[11px] text-slate-400">Preserved post-harvest shelf life</p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 font-medium">
            * Illustrative prototype simulation based on pilot models.
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            5-Step Workflow
          </span>
          <AnimatedScrollText
            text="How AgriPulse AI works on your farm."
            className="text-3xl sm:text-4xl font-black text-slate-900"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {[
            { step: "01", title: "Sense", desc: "Sensors & satellite data collect soil moisture, weather & solar conditions." },
            { step: "02", title: "Understand", desc: "AgriPulse synthesizes crop water requirements with solar availability." },
            { step: "03", title: "Recommend", desc: "The AI engine creates a simple yes/no action card with optimal timing." },
            { step: "04", title: "Act", desc: "Farmer acts manually or triggers connected solar drip irrigation." },
            { step: "05", title: "Measure", desc: "Water & energy usage are measured to calculate resource savings." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={scaleIn}>
              <GlassCard className="space-y-2 border-t-4 border-t-emerald-700 bg-white p-5 hover:-translate-y-1 transition-transform">
                <span className="text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="p-8 md:p-12 text-center space-y-6 bg-gradient-to-br from-emerald-50/90 via-teal-50/30 to-white border border-emerald-200 shadow-sm">
          <h2 className="text-3xl font-extrabold text-slate-900 max-w-2xl mx-auto">
            Ready to test AgriPulse AI on your farm?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Join smallholder farmers and FPO managers using smart water & solar scheduling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/auth/signup"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xs"
            >
              Sign Up Now
            </Link>
            <Link
              to="/auth/signin"
              className="bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 px-8 py-3.5 rounded-full font-bold text-sm shadow-2xs"
            >
              Sign In to Your Account
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

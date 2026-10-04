import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Sprout className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Irri<span className="text-emerald-400">Go</span>
                <span className="ml-1 text-xs bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              “Smarter Farming. Less Water. Cleaner Energy.”
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Farmer-centric agricultural intelligence platform designed for Indian smallholder farmers.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/#impact" className="hover:text-white transition-colors">Measured Impact</Link></li>
              <li><Link to="/simulator" className="hover:text-white transition-colors font-semibold text-emerald-300">Farm Simulator</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Technology & Architecture</Link></li>
            </ul>
          </div>

          {/* Column 3: For Farmers & FPOs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/farmer/water" className="hover:text-white transition-colors">💧 Water Intelligence</Link></li>
              <li><Link to="/farmer/energy" className="hover:text-white transition-colors">⚡ Solar Pump Scheduling</Link></li>
              <li><Link to="/farmer/crop-health" className="hover:text-white transition-colors">🌱 Crop Health Monitoring</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">🏛️ FPO Federation Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 4: Hackathon Challenge Banner */}
          <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>Hackathon Prototype</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Developed for the Sustainable Agriculture Challenge. Demonstrating water & solar pump optimization for smallholders.
            </p>
            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-700/60 flex items-center justify-between">
              <span>Status: Hackathon Ready</span>
              <span className="text-emerald-400 font-mono">v1.0.0</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} IrriGo AgriPulse AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

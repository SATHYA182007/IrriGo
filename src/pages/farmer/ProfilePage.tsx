import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { User, MapPin, Globe, Sliders, LogOut, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { isOffline, toggleOffline } = useFarm();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={t.navProfile}
        subtitle="Manage your personal farmer profile, farm location, language and IoT connectivity."
      />

      {/* User Info Card */}
      <GlassCard variant="emerald" className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {user?.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{user?.location}</span>
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mt-2">
              Registered Smallholder
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-emerald-200/80 text-xs">
          <div className="p-3 bg-white/80 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Farm Size</span>
            <span className="font-bold text-slate-800">{user?.farmSize}</span>
          </div>
          <div className="p-3 bg-white/80 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Primary Crop</span>
            <span className="font-bold text-slate-800">{user?.primaryCrop}</span>
          </div>
          <div className="p-3 bg-white/80 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Contact Mobile</span>
            <span className="font-bold text-slate-800">{user?.phone}</span>
          </div>
        </div>
      </GlassCard>

      {/* Settings Options */}
      <GlassCard className="p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900">Preferences & Connectivity</h3>

        <div className="space-y-4 text-xs">
          {/* Language Preference */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Preferred Interface Language</span>
              <span className="text-slate-500">Switch between English, Tamil, and Hindi</span>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Offline Mode Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Simulated Village Cellular Mode</span>
              <span className="text-slate-500">Enable low-bandwidth offline caching</span>
            </div>
            <button
              onClick={toggleOffline}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                isOffline ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
              <span>{isOffline ? 'Offline Active' : 'Online Sync'}</span>
            </button>
          </div>

          {/* Unit Preferences */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Measurement Units</span>
              <span className="text-slate-500">Acres / Liters / °C</span>
            </div>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Metric / Indian Ag
            </span>
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

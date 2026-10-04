import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import {
  Building2,
  LayoutDashboard,
  BarChart3,
  Cpu,
  AlertTriangle,
  ArrowLeft,
  Sliders,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminLayout: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavItems = [
    { name: t.navAdmin, path: '/admin', icon: LayoutDashboard },
    { name: 'All Farms Registry', path: '/admin/farms', icon: Building2 },
    { name: t.navAnalytics, path: '/admin/analytics', icon: BarChart3 },
    { name: t.navDevices, path: '/admin/devices', icon: Cpu },
    { name: t.navAlerts, path: '/admin/alerts', icon: AlertTriangle },
    { name: 'Farm Simulator', path: '/simulator', icon: Sliders }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFFFC]">
      <div className="flex-1 flex">
        {/* LIGHT THEME ADMIN SIDEBAR */}
        <aside className="hidden lg:flex w-60 bg-[#FAFFFC] border-r border-emerald-100/80 flex-col justify-between sticky top-0 h-screen z-30 shadow-2xs">
          <div>
            {/* Header Logo */}
            <div className="p-5 border-b border-emerald-100/70 flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-base text-slate-900 tracking-tight">IrriGo Admin</span>
                  </div>
                  <span className="text-[9px] text-emerald-700 font-semibold block -mt-0.5">FPO Operations</span>
                </div>
              </Link>
            </div>

            {/* Nav Items */}
            <div className="px-2.5 py-4 space-y-1">
              <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                FPO Admin Modules
              </div>

              {adminNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300/80 font-extrabold shadow-2xs'
                          : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70 font-semibold'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-emerald-700" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Footer controls */}
          <div className="p-3.5 border-t border-emerald-100/80 bg-white/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase text-slate-400">Language</span>
              <LanguageSwitcher />
            </div>

            <button
              onClick={() => switchRole('farmer')}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Switch to Farmer View</span>
            </button>

            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-600">
              <div className="truncate">
                <div className="font-bold text-slate-900 truncate">{user?.name || 'Anand Sharma'}</div>
                <div className="text-[9px] text-emerald-700 font-semibold">FPO Lead</div>
              </div>
              <button onClick={logout} className="p-1 text-slate-400 hover:text-rose-600" title="Sign Out">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-slate-700 hover:text-emerald-700 rounded-lg bg-emerald-50 border border-emerald-200">
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/admin" className="font-extrabold text-base text-slate-900">IrriGo FPO Admin</Link>
            </div>
            <LanguageSwitcher />
          </header>

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

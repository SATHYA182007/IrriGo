import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { NotificationDrawer } from '../components/NotificationDrawer';
import {
  Sprout,
  LayoutDashboard,
  Droplets,
  Sun,
  ShieldCheck,
  Package,
  MessageSquare,
  Bell,
  User,
  Sliders,
  LogOut,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FarmerLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications } = useFarm();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { name: t.navDashboard, path: '/farmer', icon: LayoutDashboard },
    { name: t.navWater, path: '/farmer/water', icon: Droplets },
    { name: t.navEnergy, path: '/farmer/energy', icon: Sun },
    { name: t.navCropHealth, path: '/farmer/crop-health', icon: Sprout },
    { name: t.navClimate, path: '/farmer/climate', icon: ShieldCheck },
    { name: t.navPostHarvest, path: '/farmer/post-harvest', icon: Package },
    { name: t.navAssistant, path: '/farmer/assistant', icon: MessageSquare },
    { name: t.navNotifications, path: '/farmer/notifications', icon: Bell, badge: unreadCount },
    { name: 'Farm Simulator', path: '/simulator', icon: Sliders },
    { name: t.navProfile, path: '/farmer/profile', icon: User }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFFFC]">
      <div className="flex-1 flex">
        {/* LIGHT THEME DESKTOP SIDEBAR — 90% WHITE WITH 10% SOFT GREEN */}
        <aside className="hidden lg:flex w-60 bg-[#FAFFFC] border-r border-emerald-100/80 flex-col justify-between sticky top-0 h-screen z-30 shadow-2xs">
          <div>
            {/* Sidebar Logo */}
            <div className="p-5 border-b border-emerald-100/70 flex items-center justify-between">
              <Link to="/farmer" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Sprout className="w-4.5 h-4.5 fill-emerald-100" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-base text-slate-900 tracking-tight">IrriGo</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                      Farmer
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold block -mt-0.5">AgriPulse Intelligence</span>
                </div>
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <div className="px-2.5 py-4 space-y-1">
              <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Farmer Features
              </div>

              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/farmer'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300/80 shadow-2xs font-extrabold'
                          : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70 font-semibold'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-emerald-700" />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && item.badge > 0 ? (
                      <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer User Info & Language */}
          <div className="p-3.5 border-t border-emerald-100/80 bg-white/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase text-slate-400">Language</span>
              <LanguageSwitcher />
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {user?.name?.charAt(0) || 'R'}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Ravi Kumar'}</div>
                  <div className="text-[9px] text-slate-500 truncate flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{user?.location || 'Salem, TN'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* MOBILE TOP BAR */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-slate-700 hover:text-emerald-700 rounded-lg bg-emerald-50 border border-emerald-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/farmer" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm text-slate-900">IrriGo AI</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setNotifOpen(true)}
                className="relative p-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* MAIN PAGE CONTENT CONTAINER */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <Outlet />
          </main>
        </div>
      </div>

      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900 z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white z-50 lg:hidden flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="p-4 border-b border-emerald-100 flex items-center justify-between bg-emerald-50/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-base text-slate-900">IrriGo Farmer</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/farmer'}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                            isActive ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold' : 'text-slate-700 hover:bg-emerald-50'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-emerald-700" />
                          <span>{item.name}</span>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
                <button
                  onClick={() => {
                    logout();
                    setSidebarOpen(false);
                  }}
                  className="w-full py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};

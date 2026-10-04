import React from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Bell, Droplets, Sun, Thermometer, Sprout, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useFarm();
  const { t } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets className="w-4 h-4 text-emerald-600" />;
      case 'energy':
        return <Sun className="w-4 h-4 text-emerald-600" />;
      case 'climate':
        return <Thermometer className="w-4 h-4 text-emerald-600" />;
      case 'crop':
        return <Sprout className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900 z-50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/60">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{t.navNotifications}</h3>
                  <p className="text-xs text-slate-500">AgriPulse Alerts & Updates</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No alerts right now. Your farm is running smoothly.
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      n.read
                        ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
                        : 'bg-emerald-50/80 border-emerald-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                        {getIcon(n.type)}
                        <span>{n.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
              <button
                onClick={onClose}
                className="w-full py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

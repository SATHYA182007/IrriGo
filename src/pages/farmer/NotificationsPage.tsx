import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Bell, CheckCircle, Droplets, Sun, Thermometer, Sprout } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={t.navNotifications}
        subtitle="Recent farm telemetry alerts and AI recommendation notifications."
      />

      <div className="space-y-3">
        {notifications.map(n => (
          <GlassCard
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-5 flex items-start gap-4 transition-all cursor-pointer ${
              !n.read ? 'border-l-4 border-l-emerald-600 bg-emerald-50/50' : ''
            }`}
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

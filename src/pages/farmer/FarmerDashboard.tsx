import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { AIRecommendationCard } from '../../components/AIRecommendationCard';
import { StatusCard } from '../../components/StatusCard';
import { GlassCard } from '../../components/GlassCard';
import { SimulatedCropModal } from '../../components/SimulatedCropModal';
import {
  Droplets,
  Sun,
  Sprout,
  CloudRain,
  Camera,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { sensorData, weatherData, energyData, cropFields } = useFarm();
  const { t } = useLanguage();
  const [cropScanOpen, setCropScanOpen] = useState(false);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Greeting Header — NO EMOJIS, COMPACT LIGHT THEME */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-emerald-100">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-0.5 rounded-full border border-emerald-200 inline-block mb-1.5">
            {t.whatToDoToday}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.farmerGreeting}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            {t.farmerSubGreeting}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCropScanOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t.scanCropButton}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 Farmer-First Status Cards (NO EMOJIS, HIGH VISIBILITY LIGHT THEME) */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Water Status Card */}
        <StatusCard
          icon={<Droplets className="w-4 h-4 text-sky-600" />}
          title={t.waterStatusLabel}
          statusText={sensorData.soilMoisture < 35 ? "Soil is getting dry" : "Soil moisture good"}
          badgeText={sensorData.soilMoisture < 35 ? "Action Needed" : "Optimal"}
          badgeVariant={sensorData.soilMoisture < 35 ? "warning" : "success"}
          detailMetric={`${sensorData.soilMoisture}%`}
          detailLabel="Moisture content"
          technicalDetails={[
            { label: "Soil Tension", value: "32 kPa" },
            { label: "Tank Level", value: `${sensorData.waterTankLevel}%` },
            { label: "Root Zone Depletion", value: "Low" }
          ]}
        />

        {/* Energy Status Card */}
        <StatusCard
          icon={<Sun className="w-4 h-4 text-amber-500" />}
          title={t.energyStatusLabel}
          statusText="Good solar energy available"
          badgeText="Free Power"
          badgeVariant="success"
          detailMetric={`${energyData.solarGenerationKW} kW`}
          detailLabel="Solar Generation"
          technicalDetails={[
            { label: "Peak Solar Window", value: energyData.peakSolarWindow },
            { label: "Battery Reserve", value: `${energyData.batteryLevelPercent}%` },
            { label: "Grid Status", value: "Disconnected (100% Solar)" }
          ]}
        />

        {/* Crop Health Card */}
        <StatusCard
          icon={<Sprout className="w-4 h-4 text-emerald-600" />}
          title={t.cropStatusLabel}
          statusText="Crop is healthy"
          badgeText="Normal"
          badgeVariant="success"
          detailMetric="1.2 Acres"
          detailLabel="Tomato Plot A"
          technicalDetails={[
            { label: "Growth Stage", value: "Fruiting" },
            { label: "Leaf Temperature", value: "25.2 °C" },
            { label: "NDVI Vigor Score", value: "0.82" }
          ]}
          actionText="Crop Scan"
          onClickAction={() => setCropScanOpen(true)}
        />

        {/* Weather Forecast Card */}
        <StatusCard
          icon={<CloudRain className="w-4 h-4 text-sky-600" />}
          title={t.weatherStatusLabel}
          statusText="Rain unlikely today"
          badgeText="Sunny 32°C"
          badgeVariant="info"
          detailMetric={`${weatherData.rainProbability}%`}
          detailLabel="Rain chance"
          technicalDetails={[
            { label: "Humidity", value: `${weatherData.humidity}%` },
            { label: "Wind Speed", value: `${weatherData.windSpeed} km/h` },
            { label: "7-Day Forecast", value: "Sunny through Tue" }
          ]}
        />
      </motion.div>

      {/* Flagship Large AI Recommendation Card — LIGHT THEME */}
      <motion.div variants={fadeUp}>
        <AIRecommendationCard />
      </motion.div>

      {/* Field Overview Summary */}
      <motion.div variants={fadeUp} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Your Crop Fields Status</h2>
          <span className="text-xs font-semibold text-slate-500">Updated 5 minutes ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cropFields.map(field => (
            <GlassCard key={field.id} className="p-4 space-y-2 border border-emerald-100/90 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-extrabold text-slate-600 uppercase">{field.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  field.healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {field.healthStatus === 'healthy' ? 'Healthy' : 'Monitor'}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{field.cropName}</h3>
                <p className="text-xs text-slate-500 font-semibold">{field.areaAcres} Acres • Last irrigated {field.lastIrrigationDate}</p>
              </div>
              <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed font-medium">
                {field.aiNotes}
              </p>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Crop Scan Modal */}
      <SimulatedCropModal isOpen={cropScanOpen} onClose={() => setCropScanOpen(false)} />
    </motion.div>
  );
};

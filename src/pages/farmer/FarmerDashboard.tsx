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
  MapPin,
  Clock
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
      {/* Welcome Greeting Header Header Banner */}
      <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-emerald-100/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-200">
              {t.whatToDoToday}
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Salem, Tamil Nadu • 2.4 Acres
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.farmerGreeting}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            {t.farmerSubGreeting}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCropScanOpen(true)}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{t.scanCropButton}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 Perfectly Aligned Equal-Height Status Cards */}
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
            { label: "Depletion", value: "Low" }
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
            { label: "Grid Status", value: "100% Solar" }
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
            { label: "Growth Stage", value: "Flowering" },
            { label: "Leaf Temp", value: "25.2 °C" },
            { label: "NDVI Score", value: "0.82" }
          ]}
          actionText="Crop Scan"
          onClickAction={() => setCropScanOpen(true)}
        />

        {/* Weather Forecast Card */}
        <StatusCard
          icon={<CloudRain className="w-4 h-4 text-sky-600" />}
          title={t.weatherStatusLabel}
          statusText="Rain unlikely today"
          badgeText="Sunny 34°C"
          badgeVariant="info"
          detailMetric={`${weatherData.rainProbability}%`}
          detailLabel="Rain chance"
          technicalDetails={[
            { label: "Humidity", value: `${weatherData.humidity}%` },
            { label: "Wind Speed", value: `${weatherData.windSpeed} km/h` },
            { label: "7-Day Forecast", value: "Sunny Mon-Tue" }
          ]}
        />
      </motion.div>

      {/* Flagship AI Recommendation Card */}
      <motion.div variants={fadeUp}>
        <AIRecommendationCard />
      </motion.div>

      {/* Field Overview Summary Grid */}
      <motion.div variants={fadeUp} className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Your Crop Fields Status</h2>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Updated 5 minutes ago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cropFields.map(field => (
            <div
              key={field.id}
              className="p-5 rounded-2xl bg-white border border-emerald-100/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">{field.name}</span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                  field.healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {field.healthStatus === 'healthy' ? 'Healthy' : 'Monitor'}
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{field.cropName}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{field.areaAcres} Acres • Last irrigated {field.lastIrrigationDate}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium leading-relaxed">
                {field.aiNotes}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Crop Scan Modal */}
      <SimulatedCropModal isOpen={cropScanOpen} onClose={() => setCropScanOpen(false)} />
    </motion.div>
  );
};

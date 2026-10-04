import {
  SensorData,
  WeatherData,
  EnergyData,
  CropField,
  ConnectedDevice,
  HarvestItem,
  NotificationItem,
  SimulationParams
} from '../types';
import { evaluateAgriPulseRules } from './recommendationEngine';

export const initialSensorData: SensorData = {
  soilMoisture: 28, // % (Dry - triggering recommendation)
  soilTemperature: 24, // °C
  airTemperature: 34, // °C (project_data.md Section 14 & 36)
  airHumidity: 58, // %
  solarIrradiance: 812, // W/m² (82% Solar Availability)
  waterTankLevel: 68, // %
  lastUpdated: 'Just now'
};

export const initialWeatherData: WeatherData = {
  temp: 34,
  condition: 'Sunny & Clear',
  rainProbability: 12,
  humidity: 58,
  windSpeed: 14,
  forecast: [
    { day: 'Mon', tempHigh: 34, tempLow: 22, rainProb: 10, condition: 'sunny' },
    { day: 'Tue', tempHigh: 35, tempLow: 23, rainProb: 15, condition: 'sunny' },
    { day: 'Wed', tempHigh: 32, tempLow: 21, rainProb: 70, condition: 'rainy' },
    { day: 'Thu', tempHigh: 31, tempLow: 20, rainProb: 80, condition: 'rainy' },
    { day: 'Fri', tempHigh: 33, tempLow: 21, rainProb: 20, condition: 'partly-cloudy' },
    { day: 'Sat', tempHigh: 35, tempLow: 22, rainProb: 10, condition: 'sunny' },
    { day: 'Sun', tempHigh: 36, tempLow: 23, rainProb: 5, condition: 'sunny' }
  ]
};

export const initialEnergyData: EnergyData = {
  solarGenerationKW: 3.4,
  batteryLevelPercent: 82,
  pumpConsumptionKW: 1.2,
  gridPowerKW: 0.0,
  peakSolarWindow: '10:30 AM – 12:00 PM',
  dailySolarEnergyKWh: 18.5,
  estimatedEnergySavingsPercent: 14 // 14% energy savings per project_data.md Section 52 & 54
};

export const initialCropFields: CropField[] = [
  {
    id: 'field-a',
    name: 'Field A — East Tomato Plot',
    cropName: 'Tomato (Hybrid Arka)',
    areaAcres: 1.2,
    healthStatus: 'healthy',
    soilMoisturePercent: 28,
    lastIrrigationDate: '2 days ago',
    recommendedWaterLiters: 420,
    aiNotes: 'Flowering stage requires steady soil moisture. Recommended solar window irrigation.'
  },
  {
    id: 'field-b',
    name: 'Field B — North Chilli Plot',
    cropName: 'Green Chilli (G4)',
    areaAcres: 0.8,
    healthStatus: 'monitor',
    soilMoisturePercent: 36,
    lastIrrigationDate: '1 day ago',
    recommendedWaterLiters: 210,
    aiNotes: 'Soil moisture adequate. Monitor temperature elevation tomorrow afternoon.'
  },
  {
    id: 'field-c',
    name: 'Field C — South Okra Plot',
    cropName: 'Okra (Bhindi)',
    areaAcres: 0.4,
    healthStatus: 'healthy',
    soilMoisturePercent: 48,
    lastIrrigationDate: 'Yesterday',
    recommendedWaterLiters: 0,
    aiNotes: 'Moisture level optimal. No action needed for next 48 hours.'
  }
];

export const initialDevices: ConnectedDevice[] = [
  { id: 'dev-1', name: 'AgriPulse Gateway ESP32', type: 'gateway', status: 'online', batteryPercent: 98, signalStrength: 'Strong', lastSynced: '2 mins ago', healthPercent: 99 },
  { id: 'dev-2', name: 'Capacitive Soil Sensor Node 01 (Field A)', type: 'soil_sensor', status: 'online', batteryPercent: 88, signalStrength: 'Strong', lastSynced: '5 mins ago', healthPercent: 96 },
  { id: 'dev-3', name: 'Capacitive Soil Sensor Node 02 (Field B)', type: 'soil_sensor', status: 'online', batteryPercent: 79, signalStrength: 'Moderate', lastSynced: '8 mins ago', healthPercent: 92 },
  { id: 'dev-4', name: 'Smart Flow Meter (Main Pump)', type: 'flow_meter', status: 'online', batteryPercent: 94, signalStrength: 'Strong', lastSynced: '3 mins ago', healthPercent: 98 },
  { id: 'dev-5', name: 'Ultrasonic Tank Level Sensor', type: 'water_level', status: 'online', batteryPercent: 85, signalStrength: 'Strong', lastSynced: '1 min ago', healthPercent: 97 },
  { id: 'dev-6', name: 'Rooftop Solar Inverter Monitor', type: 'solar_monitor', status: 'online', batteryPercent: 100, signalStrength: 'Strong', lastSynced: 'Just now', healthPercent: 100 }
];

export const initialHarvestItems: HarvestItem[] = [
  {
    id: 'harv-1',
    fieldName: 'Field A',
    crop: 'Tomato (Arka Rakshak)',
    readinessPercent: 82,
    estimatedHarvestWindow: '3 – 5 days',
    storageTemperature: 18,
    storageHumidity: 72,
    estimatedShelfLifeDays: 6,
    dispatchPriority: 'High'
  },
  {
    id: 'harv-2',
    fieldName: 'Field B',
    crop: 'Green Chilli (G4)',
    readinessPercent: 62,
    estimatedHarvestWindow: '10 – 12 days',
    storageTemperature: 12,
    storageHumidity: 85,
    estimatedShelfLifeDays: 14,
    dispatchPriority: 'Medium'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Solar Irrigation Recommended',
    message: 'Soil moisture is dry (28%). Solar availability high tomorrow at 10:30 AM.',
    timestamp: '10 mins ago',
    type: 'water',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Peak Solar Energy Active',
    message: 'Solar irradiance reached 812 W/m² (82% Solar Availability). Free pumping energy available.',
    timestamp: '1 hour ago',
    type: 'energy',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Heat Risk Warning',
    message: 'Temperatures expected to touch 34°C tomorrow. Maintain root zone moisture.',
    timestamp: '3 hours ago',
    type: 'climate',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Harvest Window Opening',
    message: 'Field A Tomatoes are 82% ready for harvest in 3-5 days.',
    timestamp: 'Yesterday',
    type: 'crop',
    read: true
  }
];

export function getInitialSimulation(): SimulationParams {
  return {
    soilMoisture: 28,
    temperature: 34,
    rainProbability: 12,
    solarAvailability: 82,
    waterLevel: 68,
    cropGrowthStage: 'Flowering'
  };
}

export function getCurrentRecommendation(params?: SimulationParams) {
  const p = params || getInitialSimulation();
  return evaluateAgriPulseRules(p);
}

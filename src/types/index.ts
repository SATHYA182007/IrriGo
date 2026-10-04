export type Language = 'en' | 'ta' | 'hi';

export type UserRole = 'farmer' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  location: string;
  farmSize: string;
  primaryCrop: string;
  language: Language;
}

export interface SensorData {
  soilMoisture: number; // percentage
  soilTemperature: number; // °C
  airTemperature: number; // °C
  airHumidity: number; // percentage
  solarIrradiance: number; // W/m²
  waterTankLevel: number; // percentage
  lastUpdated: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    tempHigh: number;
    tempLow: number;
    rainProb: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  }>;
}

export interface EnergyData {
  solarGenerationKW: number;
  batteryLevelPercent: number;
  pumpConsumptionKW: number;
  gridPowerKW: number;
  peakSolarWindow: string;
  dailySolarEnergyKWh: number;
  estimatedEnergySavingsPercent: number;
}

export interface CropField {
  id: string;
  name: string;
  cropName: string;
  areaAcres: number;
  healthStatus: 'healthy' | 'monitor' | 'attention';
  soilMoisturePercent: number;
  lastIrrigationDate: string;
  recommendedWaterLiters: number;
  aiNotes: string;
}

export interface Recommendation {
  id: string;
  status: 'REQUIRED' | 'POSTPONED' | 'NOT_NEEDED';
  headline: string;
  description: string;
  recommendedTime: string;
  durationMinutes: number;
  estimatedWaterLiters: number;
  energySource: 'Solar Direct' | 'Battery Storage' | 'Grid Backup';
  confidencePercent: number;
  reasons: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'water' | 'energy' | 'climate' | 'crop' | 'system';
  read: boolean;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'gateway' | 'soil_sensor' | 'flow_meter' | 'water_level' | 'solar_monitor';
  status: 'online' | 'offline' | 'warning';
  batteryPercent: number;
  signalStrength: 'Strong' | 'Moderate' | 'Weak';
  lastSynced: string;
  healthPercent: number;
}

export interface HarvestItem {
  id: string;
  fieldName: string;
  crop: string;
  readinessPercent: number;
  estimatedHarvestWindow: string;
  storageTemperature: number;
  storageHumidity: number;
  estimatedShelfLifeDays: number;
  dispatchPriority: 'High' | 'Medium' | 'Low';
}

export interface SimulationParams {
  soilMoisture: number; // 0 - 100
  temperature: number; // 15 - 45
  rainProbability: number; // 0 - 100
  solarAvailability: number; // 0 - 100
  waterLevel: number; // 0 - 100
  cropGrowthStage: 'Germination' | 'Vegetative' | 'Fruiting' | 'Harvest Ready';
}

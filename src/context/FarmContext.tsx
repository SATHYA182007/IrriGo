import React, { createContext, useContext, useState } from 'react';
import {
  SensorData,
  WeatherData,
  EnergyData,
  CropField,
  ConnectedDevice,
  HarvestItem,
  NotificationItem,
  SimulationParams,
  Recommendation
} from '../types';
import {
  initialSensorData,
  initialWeatherData,
  initialEnergyData,
  initialCropFields,
  initialDevices,
  initialHarvestItems,
  initialNotifications,
  getInitialSimulation,
  getCurrentRecommendation
} from '../services/mockIotService';

interface FarmContextType {
  sensorData: SensorData;
  weatherData: WeatherData;
  energyData: EnergyData;
  cropFields: CropField[];
  devices: ConnectedDevice[];
  harvestItems: HarvestItem[];
  notifications: NotificationItem[];
  isOffline: boolean;
  isIrrigating: boolean;
  simulationParams: SimulationParams;
  recommendation: Recommendation;
  toggleOffline: () => void;
  updateSimulation: (params: Partial<SimulationParams>) => void;
  resetSimulation: () => void;
  triggerIrrigation: () => void;
  markNotificationRead: (id: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);
  const [weatherData] = useState<WeatherData>(initialWeatherData);
  const [energyData] = useState<EnergyData>(initialEnergyData);
  const [cropFields] = useState<CropField[]>(initialCropFields);
  const [devices] = useState<ConnectedDevice[]>(initialDevices);
  const [harvestItems] = useState<HarvestItem[]>(initialHarvestItems);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isIrrigating, setIsIrrigating] = useState<boolean>(false);
  const [simulationParams, setSimulationParams] = useState<SimulationParams>(getInitialSimulation());

  const recommendation = getCurrentRecommendation(simulationParams);

  const toggleOffline = () => {
    setIsOffline(prev => !prev);
  };

  const updateSimulation = (params: Partial<SimulationParams>) => {
    setSimulationParams(prev => {
      const updated = { ...prev, ...params };
      // Sync sensorData with updated simulation params so UI remains consistent
      setSensorData(s => ({
        ...s,
        soilMoisture: updated.soilMoisture,
        airTemperature: updated.temperature,
        waterTankLevel: updated.waterLevel,
        solarIrradiance: Math.round((updated.solarAvailability / 100) * 1000)
      }));
      return updated;
    });
  };

  const resetSimulation = () => {
    const init = getInitialSimulation();
    setSimulationParams(init);
    setSensorData(initialSensorData);
  };

  const triggerIrrigation = () => {
    setIsIrrigating(true);
    setTimeout(() => {
      // Simulate soil moisture increase after irrigation
      updateSimulation({ soilMoisture: 65 });
      setIsIrrigating(false);
      // Add notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: '✅ Solar Irrigation Completed',
        message: 'Successfully irrigated 420L water using solar power. Soil moisture restored to 65%.',
        timestamp: 'Just now',
        type: 'water',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }, 2500);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <FarmContext.Provider
      value={{
        sensorData,
        weatherData,
        energyData,
        cropFields,
        devices,
        harvestItems,
        notifications,
        isOffline,
        isIrrigating,
        simulationParams,
        recommendation,
        toggleOffline,
        updateSimulation,
        resetSimulation,
        triggerIrrigation,
        markNotificationRead
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = (): FarmContextType => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};

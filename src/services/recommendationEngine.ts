import { Recommendation, SimulationParams } from '../types';

export function evaluateAgriPulseRules(params: SimulationParams): Recommendation {
  const { soilMoisture, rainProbability, solarAvailability, waterLevel, cropGrowthStage } = params;

  // Rule 1: High rain probability overrides irrigation needs
  if (rainProbability >= 55) {
    return {
      id: `rec-${Date.now()}`,
      status: 'POSTPONED',
      headline: 'Hold Irrigation — Rain Expected Soon',
      description: `High rainfall probability (${rainProbability}%) detected in your area. Irrigation is postponed to save water and energy.`,
      recommendedTime: 'Postponed for 24 hours',
      durationMinutes: 0,
      estimatedWaterLiters: 0,
      energySource: 'Solar Direct',
      confidencePercent: 94,
      reasons: [
        `High rain probability (${rainProbability}%) will naturally hydrate your crop`,
        'Soil moisture will replenish naturally without pumping costs',
        'Preserving 420L of water tank capacity for dry spells',
        'Eliminating pump energy usage completely today'
      ]
    };
  }

  // Rule 2: Adequate soil moisture
  if (soilMoisture >= 50) {
    return {
      id: `rec-${Date.now()}`,
      status: 'NOT_NEEDED',
      headline: 'Soil Has Healthy Moisture — No Irrigation Needed Today',
      description: `Your soil moisture level is currently at ${soilMoisture}%, which is optimal for the ${cropGrowthStage} stage.`,
      recommendedTime: 'No action required today',
      durationMinutes: 0,
      estimatedWaterLiters: 0,
      energySource: 'Solar Direct',
      confidencePercent: 98,
      reasons: [
        `Soil moisture (${soilMoisture}%) is above the minimum threshold (35%)`,
        `Root zone moisture is ideal for ${cropGrowthStage} health`,
        'Prevents over-watering and root rot risk',
        'Saves solar battery charge for peak evening operational needs'
      ]
    };
  }

  // Rule 3: Low water tank capacity warning
  if (waterLevel < 25) {
    return {
      id: `rec-${Date.now()}`,
      status: 'REQUIRED',
      headline: 'Light Irrigation Recommended — Low Tank Reserve',
      description: `Soil moisture is low (${soilMoisture}%), but water tank level is only ${waterLevel}%. Running a short 20-minute targeted irrigation cycle.`,
      recommendedTime: '11:00 AM Today',
      durationMinutes: 20,
      estimatedWaterLiters: 240,
      energySource: solarAvailability > 60 ? 'Solar Direct' : 'Grid Backup',
      confidencePercent: 88,
      reasons: [
        `Soil moisture (${soilMoisture}%) needs replenishment`,
        `Water tank reserve (${waterLevel}%) limits full irrigation cycle`,
        'Targeted micro-drip irrigation to critical root zones',
        'Refill water storage during peak solar hours'
      ]
    };
  }

  // Rule 4: Irrigation Required - High Solar vs Normal Solar
  const isHighSolar = solarAvailability >= 70;
  const recommendedTime = isHighSolar ? '10:30 AM Tomorrow' : '07:30 AM Tomorrow';
  const energySource = isHighSolar ? 'Solar Direct' : 'Battery Storage';
  const duration = cropGrowthStage === 'Fruiting' ? 40 : 30;
  const waterLiters = duration * 12; // 12L per minute

  return {
    id: `rec-${Date.now()}`,
    status: 'REQUIRED',
    headline: 'Solar-Optimized Irrigation Recommended',
    description: `Soil moisture is dry (${soilMoisture}%). Rain probability is low (${rainProbability}%). Peak solar power will power your pump for free at ${recommendedTime}.`,
    recommendedTime,
    durationMinutes: duration,
    estimatedWaterLiters: waterLiters,
    energySource,
    confidencePercent: 96,
    reasons: [
      `Soil moisture (${soilMoisture}%) is below optimal target (45%)`,
      `Rain probability (${rainProbability}%) is low for the next 36 hours`,
      `Crop in ${cropGrowthStage} stage requires active transpiration moisture`,
      `Peak solar irradiance (${solarAvailability}%) powers pump without grid or diesel costs`
    ]
  };
}

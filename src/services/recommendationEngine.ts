import { Recommendation, SimulationParams } from '../types';

export function evaluateAgriPulseRules(params: SimulationParams): Recommendation {
  const { soilMoisture, rainProbability, solarAvailability, waterLevel, cropGrowthStage } = params;

  // Rule 1: High rain probability overrides irrigation needs (project_data.md Section 15 & 16)
  if (rainProbability >= 55) {
    return {
      id: `rec-${Date.now()}`,
      status: 'POSTPONED',
      headline: 'Rain is Likely — Irrigation Postponed',
      description: `High rainfall probability (${rainProbability}%) detected. Rain is likely. Postpone irrigation and recheck soil moisture after rainfall.`,
      recommendedTime: 'Postponed for 24 hours',
      durationMinutes: 0,
      estimatedWaterLiters: 0,
      energySource: 'Solar Direct',
      confidencePercent: 94,
      reasons: [
        `High rain probability (${rainProbability}%) will naturally hydrate your farm`,
        'Soil moisture will replenish naturally without pumping costs',
        'Preserves water storage tank capacity for future dry spells',
        'Eliminates pump energy consumption completely today'
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
      recommendedTime: '10:30 AM Tomorrow',
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

  // Rule 4: Irrigation Required - High Solar vs Normal Solar (project_data.md Section 14)
  const isHighSolar = solarAvailability >= 70;
  const recommendedTime = '10:30 AM Tomorrow';
  const energySource = isHighSolar ? 'Solar Direct' : 'Battery Storage';
  const duration = cropGrowthStage === 'Flowering' ? 35 : (cropGrowthStage === 'Fruiting' ? 40 : 30);
  const waterLiters = duration * 12; // 35 min * 12L/min = 420 L

  return {
    id: `rec-${Date.now()}`,
    status: 'REQUIRED',
    headline: 'Irrigation Required — Solar Window Recommended',
    description: `Your soil is getting dry (${soilMoisture}%). Rain is unlikely today (${rainProbability}%). Good solar energy (${solarAvailability}%) is available. Recommended action: Irrigate tomorrow at 10:30 AM for ${duration} minutes (${waterLiters}L).`,
    recommendedTime,
    durationMinutes: duration,
    estimatedWaterLiters: waterLiters,
    energySource,
    confidencePercent: 96,
    reasons: [
      `Soil moisture (${soilMoisture}%) is decreasing below target (45%)`,
      `Rain is unlikely (${rainProbability}%) over the next 36 hours`,
      `Water level (${waterLevel}%) is sufficient for full drip cycle`,
      `Good solar energy availability (${solarAvailability}%) powers pump without grid or diesel costs`
    ]
  };
}

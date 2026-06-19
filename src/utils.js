/**
 * @fileoverview Pure utility functions for carbon footprint calculations.
 * Separated from React components for testability and reusability.
 * @module utils
 */

import {
  CAR_EMISSION_FACTORS,
  FLIGHT_EMISSIONS,
  PUBLIC_TRANSPORT_EMISSION_PER_HOUR,
  WEEKS_PER_YEAR,
  MONTHS_PER_YEAR,
  GRID_EMISSION_FACTOR,
  HEATING_FUEL_FACTORS,
  DIET_BASELINES,
  LOCAL_FOOD_SAVING_FACTOR,
  WASTE_BASE_EMISSIONS,
  RECYCLING_REDUCTION,
  COMPOSTING_REDUCTION,
  MIN_WASTE_EMISSIONS,
  KG_PER_TON,
} from './constants.js';

/**
 * @typedef {Object} UserData
 * @property {Object} transport - Transportation profile
 * @property {string} transport.carType - Vehicle type: 'none' | 'electric' | 'hybrid' | 'average' | 'suv'
 * @property {number} transport.carKms - Annual driving distance in kilometers
 * @property {number} transport.flightsShort - Number of short flights per year (< 3 hours)
 * @property {number} transport.flightsLong - Number of long flights per year (> 3 hours)
 * @property {number} transport.publicTransportHours - Weekly public transport hours
 * @property {Object} energy - Home energy profile
 * @property {number} energy.electricityKwh - Monthly electricity consumption in kWh
 * @property {string} energy.heatingFuel - Heating fuel type: 'none' | 'gas' | 'electric' | 'oil'
 * @property {number} energy.heatingCost - Monthly heating cost in dollars
 * @property {number} energy.cleanEnergyPortion - Percentage of renewable energy (0-100)
 * @property {Object} diet - Dietary profile
 * @property {string} diet.meatConsumption - Meat consumption level: 'heavy' | 'average' | 'low' | 'vegetarian' | 'vegan'
 * @property {number} diet.localFoodPortion - Percentage of locally sourced food (0-100)
 * @property {boolean} diet.recycle - Whether the user recycles regularly
 * @property {boolean} diet.compost - Whether the user composts organic waste
 */

/**
 * @typedef {Object} EmissionsResult
 * @property {number} transport - Annual transport emissions in kg CO2e
 * @property {number} energy - Annual energy emissions in kg CO2e
 * @property {number} diet - Annual diet emissions in kg CO2e
 * @property {number} waste - Annual waste emissions in kg CO2e
 * @property {number} total - Total annual emissions in metric tons CO2e
 */

/**
 * Calculate annual carbon emissions based on user lifestyle data.
 *
 * The calculation covers four categories:
 * 1. **Transportation**: Car driving, flights, and public transit
 * 2. **Home Energy**: Electricity and heating fuel consumption
 * 3. **Diet**: Meat consumption level and local food sourcing
 * 4. **Waste**: Recycling and composting habits
 *
 * @param {UserData} data - User lifestyle data
 * @returns {EmissionsResult} Breakdown of annual CO2e emissions
 *
 * @example
 * const emissions = calculateEmissions(userData);
 * console.log(`Total: ${emissions.total} tons CO2e/year`);
 */
export function calculateEmissions(data) {
  // 1. Transportation
  const carFactor = CAR_EMISSION_FACTORS[data.transport.carType] ?? CAR_EMISSION_FACTORS.average;
  const transportCar = data.transport.carKms * carFactor;
  const transportFlights =
    data.transport.flightsShort * FLIGHT_EMISSIONS.short +
    data.transport.flightsLong * FLIGHT_EMISSIONS.long;
  const transportPublic =
    data.transport.publicTransportHours * WEEKS_PER_YEAR * PUBLIC_TRANSPORT_EMISSION_PER_HOUR;
  const transportTotal = transportCar + transportFlights + transportPublic;

  // 2. Home Energy
  const cleanMultiplier = 1 - data.energy.cleanEnergyPortion / 100;
  const energyElectricity =
    data.energy.electricityKwh * MONTHS_PER_YEAR * GRID_EMISSION_FACTOR * cleanMultiplier;

  const heatingFactor = HEATING_FUEL_FACTORS[data.energy.heatingFuel] ?? HEATING_FUEL_FACTORS.gas;
  const energyHeating = data.energy.heatingCost * MONTHS_PER_YEAR * heatingFactor;
  const energyTotal = energyElectricity + energyHeating;

  // 3. Diet & Consumption
  const dietBase = DIET_BASELINES[data.diet.meatConsumption] ?? DIET_BASELINES.average;
  const dietTotal = dietBase * (1 - (data.diet.localFoodPortion / 100) * LOCAL_FOOD_SAVING_FACTOR);

  // 4. Waste & Recycling
  let wasteTotal = WASTE_BASE_EMISSIONS;
  if (data.diet.recycle) wasteTotal -= RECYCLING_REDUCTION;
  if (data.diet.compost) wasteTotal -= COMPOSTING_REDUCTION;
  wasteTotal = Math.max(MIN_WASTE_EMISSIONS, wasteTotal);

  // Combined metric tons
  const totalTons = (transportTotal + energyTotal + dietTotal + wasteTotal) / KG_PER_TON;

  return {
    transport: transportTotal,
    energy: energyTotal,
    diet: dietTotal,
    waste: wasteTotal,
    total: totalTons,
  };
}

/**
 * Calculate cumulative CO2e savings from logged eco-actions.
 *
 * @param {Object<string, number>} loggedActions - Map of action IDs to their logged counts
 * @param {import('./constants.js').ActionDefinition[]} actionDefinitions - Array of action definitions
 * @returns {number} Total CO2e savings in kilograms
 *
 * @example
 * const savings = calculateActionSavings({ commute_bike: 3 }, ACTION_DEFINITIONS);
 * console.log(`Saved ${savings} kg CO2e`);
 */
export function calculateActionSavings(loggedActions, actionDefinitions) {
  return Object.keys(loggedActions).reduce((acc, actionId) => {
    const actionDef = actionDefinitions.find((a) => a.id === actionId);
    if (actionDef) {
      return acc + actionDef.saving * (loggedActions[actionId] || 0);
    }
    return acc;
  }, 0);
}

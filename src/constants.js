/**
 * @fileoverview Application-wide constants for the EcoTrace Carbon Footprint Calculator.
 * Centralizes emission factors, thresholds, and action definitions to avoid magic numbers.
 * @module constants
 */

// =========================================================
// Emission Factors (kg CO2e)
// =========================================================

/**
 * CO2 emission factors per kilometer for different vehicle types.
 * Source: EPA and ICCT averages.
 * @readonly
 * @enum {number}
 */
export const CAR_EMISSION_FACTORS = Object.freeze({
  none: 0,
  electric: 0.04,
  hybrid: 0.09,
  average: 0.18,
  suv: 0.25,
});

/**
 * CO2 emissions per flight (kg CO2e).
 * Short flights: < 3 hours. Long flights: > 3 hours.
 * @readonly
 */
export const FLIGHT_EMISSIONS = Object.freeze({
  short: 250,
  long: 900,
});

/**
 * CO2 emission rate for public transport (kg CO2e per hour).
 * @constant {number}
 */
export const PUBLIC_TRANSPORT_EMISSION_PER_HOUR = 0.14;

/**
 * Number of weeks in a year, used for annualizing weekly figures.
 * @constant {number}
 */
export const WEEKS_PER_YEAR = 52;

/**
 * Months in a year, used for annualizing monthly figures.
 * @constant {number}
 */
export const MONTHS_PER_YEAR = 12;

/**
 * Average grid electricity emission factor (kg CO2e per kWh).
 * @constant {number}
 */
export const GRID_EMISSION_FACTOR = 0.38;

/**
 * Heating fuel emission factors (kg CO2e per dollar spent per month).
 * @readonly
 * @enum {number}
 */
export const HEATING_FUEL_FACTORS = Object.freeze({
  none: 0,
  gas: 1.6,
  electric: 1.1,
  oil: 2.4,
});

/**
 * Annual dietary carbon footprint baselines (kg CO2e/year).
 * @readonly
 * @enum {number}
 */
export const DIET_BASELINES = Object.freeze({
  heavy: 2600,
  average: 1800,
  low: 1200,
  vegetarian: 850,
  vegan: 500,
});

/**
 * Maximum reduction factor for local food sourcing.
 * Buying 100% local saves up to 12% of diet footprint.
 * @constant {number}
 */
export const LOCAL_FOOD_SAVING_FACTOR = 0.12;

/**
 * Base annual waste emissions (kg CO2e/year).
 * @constant {number}
 */
export const WASTE_BASE_EMISSIONS = 450;

/**
 * CO2e reduction from regular recycling (kg/year).
 * @constant {number}
 */
export const RECYCLING_REDUCTION = 160;

/**
 * CO2e reduction from composting organic waste (kg/year).
 * @constant {number}
 */
export const COMPOSTING_REDUCTION = 110;

/**
 * Minimum waste emissions floor (kg CO2e/year).
 * @constant {number}
 */
export const MIN_WASTE_EMISSIONS = 80;

/**
 * Kilograms per metric ton conversion factor.
 * @constant {number}
 */
export const KG_PER_TON = 1000;

/**
 * Average CO2 absorbed by a single tree per year (kg).
 * @constant {number}
 */
export const CO2_PER_TREE_PER_YEAR = 22;

/**
 * Average car CO2 emission per km (kg), used for driving offset equivalency.
 * @constant {number}
 */
export const AVG_CAR_EMISSION_PER_KM = 0.18;

// =========================================================
// Footprint Thresholds
// =========================================================

/**
 * Footprint thresholds (in metric tons CO2e/year) for climate rating.
 * @readonly
 */
export const FOOTPRINT_THRESHOLDS = Object.freeze({
  sustainable: 2.0,
  moderate: 6.0,
  maxGauge: 20.0,
});

// =========================================================
// Eco Action Definitions
// =========================================================

/**
 * @typedef {Object} ActionDefinition
 * @property {string} id - Unique action identifier
 * @property {string} name - Human-readable action name
 * @property {string} category - Category: 'transport' | 'energy' | 'diet' | 'waste'
 * @property {number} saving - kg CO2e saved per unit
 * @property {string} unit - Unit label (e.g., 'trip', 'day', 'load')
 */

/**
 * Available eco-actions and their per-unit carbon savings.
 * @type {Readonly<ActionDefinition[]>}
 */
export const ACTION_DEFINITIONS = Object.freeze([
  { id: 'commute_bike', name: 'Bike / Walk instead of Driving', category: 'transport', saving: 2.8, unit: 'trip' },
  { id: 'carpool', name: 'Carpool with others', category: 'transport', saving: 1.9, unit: 'commute' },
  { id: 'cold_wash', name: 'Wash laundry in cold water', category: 'energy', saving: 0.6, unit: 'load' },
  { id: 'thermostat', name: 'Lower thermostat by 1°C', category: 'energy', saving: 1.3, unit: 'day' },
  { id: 'plant_based_day', name: 'Fully plant-based diet day', category: 'diet', saving: 4.4, unit: 'day' },
  { id: 'no_food_waste', name: 'Zero food waste day', category: 'diet', saving: 1.1, unit: 'day' },
  { id: 'unplug_standby', name: 'Unplug standby electronics', category: 'energy', saving: 0.4, unit: 'day' },
  { id: 'avoid_plastic', name: 'Avoid single-use packaging', category: 'waste', saving: 0.8, unit: 'day' },
]);

/**
 * Default user data state for the carbon calculator.
 * @readonly
 */
export const DEFAULT_USER_DATA = Object.freeze({
  transport: {
    carType: 'average',
    carKms: 12000,
    flightsShort: 2,
    flightsLong: 0,
    publicTransportHours: 4,
  },
  energy: {
    electricityKwh: 320,
    heatingFuel: 'gas',
    heatingCost: 75,
    cleanEnergyPortion: 15,
  },
  diet: {
    meatConsumption: 'average',
    localFoodPortion: 20,
    recycle: true,
    compost: false,
  },
});

/**
 * Global comparison benchmarks for the dashboard (tons CO2e/year).
 * @readonly
 */
export const GLOBAL_COMPARISONS = Object.freeze([
  { name: 'Sustainable Goal', value: 2.0, color: 'var(--secondary)' },
  { name: 'Global Average', value: 4.5, color: '#a7f3d0' },
  { name: 'US Average', value: 16.0, color: '#f87171' },
]);

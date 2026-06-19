import { describe, it, expect } from 'vitest';
import { calculateEmissions, calculateActionSavings } from './utils';

describe('utils', () => {
  describe('calculateEmissions', () => {
    it('calculates zero footprint for completely clean profile', () => {
      const cleanProfile = {
        transport: { carType: 'none', carKms: 0, flightsShort: 0, flightsLong: 0, publicTransportHours: 0 },
        energy: { electricityKwh: 0, heatingFuel: 'none', heatingCost: 0, cleanEnergyPortion: 100 },
        diet: { meatConsumption: 'vegan', localFoodPortion: 100, recycle: true, compost: true }
      };
      
      const result = calculateEmissions(cleanProfile);
      
      // Some baseline waste emissions remain
      expect(result.total).toBeGreaterThan(0);
      expect(result.transport).toBe(0);
      expect(result.energy).toBe(0);
    });

    it('calculates footprint for an average user', () => {
      const avgProfile = {
        transport: { carType: 'average', carKms: 12000, flightsShort: 2, flightsLong: 0, publicTransportHours: 2 },
        energy: { electricityKwh: 300, heatingFuel: 'gas', heatingCost: 100, cleanEnergyPortion: 0 },
        diet: { meatConsumption: 'average', localFoodPortion: 20, recycle: false, compost: false }
      };

      const result = calculateEmissions(avgProfile);
      
      expect(result.transport).toBeGreaterThan(2000);
      expect(result.energy).toBeGreaterThan(1000);
      expect(result.diet).toBeGreaterThan(1500);
      expect(result.waste).toBeGreaterThan(400);
      expect(result.total).toBeGreaterThan(6); // Should be > 6 tons
    });
  });

  describe('calculateActionSavings', () => {
    it('calculates total savings from a list of logged actions', () => {
      const loggedActions = {
        'bike': 2,
        'recycle': 1,
        'unknown': 5
      };
      const actionDefinitions = [
        { id: 'bike', saving: 5 },
        { id: 'recycle', saving: 10 }
      ];

      const savings = calculateActionSavings(loggedActions, actionDefinitions);
      expect(savings).toBe(20); // (2 * 5) + (1 * 10) + 0
    });

    it('returns 0 if no actions are logged', () => {
      const loggedActions = {};
      const actionDefinitions = [
        { id: 'bike', saving: 5 },
      ];
      expect(calculateActionSavings(loggedActions, actionDefinitions)).toBe(0);
    });
  });
});

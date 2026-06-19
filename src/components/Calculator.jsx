/**
 * @fileoverview Multi-step carbon footprint calculator component.
 * Allows users to input their transportation, energy, and dietary profiles
 * through an interactive wizard-style form with proper accessibility support.
 * @module Calculator
 */

import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Car, Flame, Utensils, Check } from 'lucide-react';

import TravelStep from './calculator/TravelStep.jsx';
import EnergyStep from './calculator/EnergyStep.jsx';
import DietStep from './calculator/DietStep.jsx';

/**
 * Step configuration for the wizard navigation.
 * @readonly
 */
const STEPS = [
  { id: 'travel', label: '1. Travel', Icon: Car },
  { id: 'energy', label: '2. Utilities', Icon: Flame },
  { id: 'diet', label: '3. Consumption', Icon: Utensils },
];

/**
 * Multi-step calculator component for inputting carbon footprint data.
 *
 * @param {Object} props
 * @param {Object} props.userData - Current user lifestyle data
 * @param {Function} props.setUserData - State setter for user data
 * @param {Function} props.setActiveTab - Callback to switch the active navigation tab
 * @returns {React.ReactElement} Calculator wizard UI
 */
const Calculator = memo(function Calculator({ userData, setUserData, setActiveTab }) {
  const [activeStep, setActiveStep] = useState('travel');

  /**
   * Update a transport-related field.
   * @param {string} key - The transport property to update
   * @param {*} value - The new value
   */
  const handleTransportChange = useCallback((key, value) => {
    setUserData((prev) => ({
      ...prev,
      transport: { ...prev.transport, [key]: value },
    }));
  }, [setUserData]);

  /**
   * Update an energy-related field.
   * @param {string} key - The energy property to update
   * @param {*} value - The new value
   */
  const handleEnergyChange = useCallback((key, value) => {
    setUserData((prev) => ({
      ...prev,
      energy: { ...prev.energy, [key]: value },
    }));
  }, [setUserData]);

  /**
   * Update a diet/waste-related field.
   * @param {string} key - The diet property to update
   * @param {*} value - The new value
   */
  const handleDietChange = useCallback((key, value) => {
    setUserData((prev) => ({
      ...prev,
      diet: { ...prev.diet, [key]: value },
    }));
  }, [setUserData]);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold mb-2">Carbon Footprint Calculator</h2>
        <p className="text-gray-400 text-sm">Fine-tune your daily habits to get an accurate representation of your environmental footprint.</p>
      </div>

      {/* Step Selection Header */}
      <div className="grid grid-cols-3 gap-2 mb-6" role="tablist" aria-label="Calculator steps">
        {STEPS.map(({ id, label, Icon }) => (
          <button
            key={id}
            role="tab"
            id={`calc-tab-${id}`}
            aria-selected={activeStep === id}
            aria-controls={`calc-panel-${id}`}
            onClick={() => setActiveStep(id)}
            className={`glass-panel p-4 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeStep === id ? 'glass-panel-active border-emerald-500/50 bg-emerald-500/5' : 'opacity-60 hover:opacity-90'}`}
          >
            <Icon className={activeStep === id ? 'text-emerald-400' : 'text-gray-400'} size={20} aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
          </button>
        ))}
      </div>

      {/* Wizard Form Panel */}
      <div className="glass-panel p-6 md:p-8 mb-6">
        {activeStep === 'travel' && (
          <TravelStep 
            transportData={userData.transport} 
            handleTransportChange={handleTransportChange} 
          />
        )}

        {activeStep === 'energy' && (
          <EnergyStep 
            energyData={userData.energy} 
            handleEnergyChange={handleEnergyChange} 
          />
        )}

        {activeStep === 'diet' && (
          <DietStep 
            dietData={userData.diet} 
            handleDietChange={handleDietChange} 
          />
        )}
      </div>

      {/* Navigation & Submission Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <p className="text-xs text-gray-500">Your footprint updates in real-time on the dashboard.</p>
        
        {activeStep === 'travel' && (
          <button 
            onClick={() => setActiveStep('energy')} 
            className="btn-secondary"
            aria-label="Proceed to the Utilities step"
          >
            Next: Utilities
          </button>
        )}

        {activeStep === 'energy' && (
          <button 
            onClick={() => setActiveStep('diet')} 
            className="btn-secondary"
            aria-label="Proceed to the Consumption step"
          >
            Next: Consumption
          </button>
        )}

        {activeStep === 'diet' && (
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="btn-primary text-xs"
            aria-label="View your updated carbon dashboard"
          >
            See Carbon Dashboard <Check size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
});

Calculator.propTypes = {
  /** Current user lifestyle data for all calculator inputs */
  userData: PropTypes.shape({
    transport: PropTypes.shape({
      carType: PropTypes.string.isRequired,
      carKms: PropTypes.number.isRequired,
      flightsShort: PropTypes.number.isRequired,
      flightsLong: PropTypes.number.isRequired,
      publicTransportHours: PropTypes.number.isRequired,
    }).isRequired,
    energy: PropTypes.shape({
      electricityKwh: PropTypes.number.isRequired,
      heatingFuel: PropTypes.string.isRequired,
      heatingCost: PropTypes.number.isRequired,
      cleanEnergyPortion: PropTypes.number.isRequired,
    }).isRequired,
    diet: PropTypes.shape({
      meatConsumption: PropTypes.string.isRequired,
      localFoodPortion: PropTypes.number.isRequired,
      recycle: PropTypes.bool.isRequired,
      compost: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  /** State setter function for user data */
  setUserData: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Calculator;

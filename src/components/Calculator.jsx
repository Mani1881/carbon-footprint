import React, { useState } from 'react';
import { Car, Flame, Utensils, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Calculator({ userData, setUserData, setActiveTab }) {
  const [activeStep, setActiveStep] = useState('travel'); // travel, energy, diet

  // Handlers for transport state
  const handleTransportChange = (key, value) => {
    setUserData(prev => ({
      ...prev,
      transport: { ...prev.transport, [key]: value }
    }));
  };

  // Handlers for energy state
  const handleEnergyChange = (key, value) => {
    setUserData(prev => ({
      ...prev,
      energy: { ...prev.energy, [key]: value }
    }));
  };

  // Handlers for diet/waste state
  const handleDietChange = (key, value) => {
    setUserData(prev => ({
      ...prev,
      diet: { ...prev.diet, [key]: value }
    }));
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold mb-2">Carbon Footprint Calculator</h2>
        <p className="text-gray-400 text-sm">Fine-tune your daily habits to get an accurate representation of your environmental footprint.</p>
      </div>

      {/* Step Selection Header */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button 
          onClick={() => setActiveStep('travel')}
          className={`glass-panel p-4 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeStep === 'travel' ? 'glass-panel-active border-emerald-500/50 bg-emerald-500/5' : 'opacity-60 hover:opacity-90'}`}
        >
          <Car className={activeStep === 'travel' ? 'text-emerald-400' : 'text-gray-400'} size={20} />
          <span className="text-xs font-semibold uppercase tracking-wider">1. Travel</span>
        </button>

        <button 
          onClick={() => setActiveStep('energy')}
          className={`glass-panel p-4 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeStep === 'energy' ? 'glass-panel-active border-emerald-500/50 bg-emerald-500/5' : 'opacity-60 hover:opacity-90'}`}
        >
          <Flame className={activeStep === 'energy' ? 'text-emerald-400' : 'text-gray-400'} size={20} />
          <span className="text-xs font-semibold uppercase tracking-wider">2. Utilities</span>
        </button>

        <button 
          onClick={() => setActiveStep('diet')}
          className={`glass-panel p-4 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeStep === 'diet' ? 'glass-panel-active border-emerald-500/50 bg-emerald-500/5' : 'opacity-60 hover:opacity-90'}`}
        >
          <Utensils className={activeStep === 'diet' ? 'text-emerald-400' : 'text-gray-400'} size={20} />
          <span className="text-xs font-semibold uppercase tracking-wider">3. Consumption</span>
        </button>
      </div>

      {/* Wizard Form Panel */}
      <div className="glass-panel p-6 md:p-8 mb-6">
        
        {/* STEP 1: TRAVEL & MOBILITY */}
        {activeStep === 'travel' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <h3 className="text-xl font-bold border-b border-white/5 pb-2">Transportation Profile</h3>
            
            {/* Vehicle Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Primary Commuting Vehicle</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { value: 'none', label: 'No Car' },
                  { value: 'electric', label: 'Electric' },
                  { value: 'hybrid', label: 'Hybrid' },
                  { value: 'average', label: 'Petrol/Diesel' },
                  { value: 'suv', label: 'SUV/Truck' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleTransportChange('carType', opt.value)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${userData.transport.carType === opt.value ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Car Annual Mileage */}
            {userData.transport.carType !== 'none' && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-300">Annual Driving Mileage</span>
                  <span className="text-emerald-400 font-bold">{userData.transport.carKms.toLocaleString()} km / year</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40000" 
                  step="1000"
                  value={userData.transport.carKms}
                  onChange={(e) => handleTransportChange('carKms', parseInt(e.target.value))}
                />
                <span className="text-[10px] text-gray-500">Average car driver logs roughly 12,000 km annually.</span>
              </div>
            )}

            {/* Public Transport */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-300">Public Transit (Train, Bus, Subway)</span>
                <span className="text-emerald-400 font-bold">{userData.transport.publicTransportHours} hours / week</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="40" 
                step="1"
                value={userData.transport.publicTransportHours}
                onChange={(e) => handleTransportChange('publicTransportHours', parseInt(e.target.value))}
              />
            </div>

            {/* Flights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-300">Short Flights (&lt; 3 hrs)</span>
                  <span className="text-emerald-400 font-bold">{userData.transport.flightsShort} flights / year</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  step="1"
                  value={userData.transport.flightsShort}
                  onChange={(e) => handleTransportChange('flightsShort', parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-300">Long Flights (&gt; 3 hrs)</span>
                  <span className="text-emerald-400 font-bold">{userData.transport.flightsLong} flights / year</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="1"
                  value={userData.transport.flightsLong}
                  onChange={(e) => handleTransportChange('flightsLong', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: UTILITIES & HEATING */}
        {activeStep === 'energy' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <h3 className="text-xl font-bold border-b border-white/5 pb-2">Home Utilities</h3>

            {/* Electricity Kwh */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-300">Monthly Household Electricity</span>
                <span className="text-emerald-400 font-bold">{userData.energy.electricityKwh} kWh / month</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1200" 
                step="20"
                value={userData.energy.electricityKwh}
                onChange={(e) => handleEnergyChange('electricityKwh', parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-500">Average household uses around 300-400 kWh/month.</span>
            </div>

            {/* Renewable portion */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-300">Renewable Energy Portion (Green Grid or Solar)</span>
                <span className="text-emerald-400 font-bold">{userData.energy.cleanEnergyPortion}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={userData.energy.cleanEnergyPortion}
                onChange={(e) => handleEnergyChange('cleanEnergyPortion', parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-500">Reduces direct electricity emissions. Set to 100% if on a certified green supplier.</span>
            </div>

            {/* Heating Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300">Heating Energy Source</label>
                <select 
                  value={userData.energy.heatingFuel}
                  onChange={(e) => handleEnergyChange('heatingFuel', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-gray-300 outline-none focus:border-emerald-500"
                >
                  <option value="none" className="bg-gray-950">No Active Heating</option>
                  <option value="gas" className="bg-gray-950">Natural Gas</option>
                  <option value="electric" className="bg-gray-950">Electric / Heat Pump</option>
                  <option value="oil" className="bg-gray-950">Fuel Oil</option>
                </select>
              </div>

              {userData.energy.heatingFuel !== 'none' && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-300">Average Heating Bill</span>
                    <span className="text-emerald-400 font-bold">${userData.energy.heatingCost} / month</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="300" 
                    step="10"
                    value={userData.energy.heatingCost}
                    onChange={(e) => handleEnergyChange('heatingCost', parseInt(e.target.value))}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: DIET, SOURCING & WASTE */}
        {activeStep === 'diet' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <h3 className="text-xl font-bold border-b border-white/5 pb-2">Diet & Consumption</h3>

            {/* Meat consumption */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Dietary Preferences</label>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {[
                  { value: 'heavy', label: 'Meat Lover' },
                  { value: 'average', label: 'Average Meat' },
                  { value: 'low', label: 'Low Meat' },
                  { value: 'vegetarian', label: 'Vegetarian' },
                  { value: 'vegan', label: 'Vegan' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleDietChange('meatConsumption', opt.value)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${userData.diet.meatConsumption === opt.value ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Local Food portion */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-300">Locally Sourced Food Ratio</span>
                <span className="text-emerald-400 font-bold">{userData.diet.localFoodPortion}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={userData.diet.localFoodPortion}
                onChange={(e) => handleDietChange('localFoodPortion', parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-500">Buying local reduces food transport emissions ("food miles").</span>
            </div>

            {/* Household Recycling / Waste habits */}
            <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
              <label className="text-sm font-semibold text-gray-300">Waste Reduction Habits</label>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleDietChange('recycle', !userData.diet.recycle)}
                  className={`flex-1 flex items-center justify-between p-3 rounded-xl border transition-all ${userData.diet.recycle ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <span className="text-xs font-bold uppercase">We Recycle Regularly</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${userData.diet.recycle ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-gray-600'}`}>
                    {userData.diet.recycle && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDietChange('compost', !userData.diet.compost)}
                  className={`flex-1 flex items-center justify-between p-3 rounded-xl border transition-all ${userData.diet.compost ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <span className="text-xs font-bold uppercase">We Compost Organic Waste</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${userData.diet.compost ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-gray-600'}`}>
                    {userData.diet.compost && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button Controls */}
      <div className="flex items-center justify-between">
        {activeStep === 'travel' && (
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
        )}
        
        {activeStep === 'energy' && (
          <button 
            onClick={() => setActiveStep('travel')} 
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Previous: Travel
          </button>
        )}

        {activeStep === 'diet' && (
          <button 
            onClick={() => setActiveStep('energy')} 
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Previous: Utilities
          </button>
        )}

        {activeStep === 'travel' && (
          <button 
            onClick={() => setActiveStep('energy')} 
            className="btn-primary text-xs"
          >
            Next: Utilities <ArrowRight size={14} />
          </button>
        )}

        {activeStep === 'energy' && (
          <button 
            onClick={() => setActiveStep('diet')} 
            className="btn-primary text-xs"
          >
            Next: Diet & Waste <ArrowRight size={14} />
          </button>
        )}

        {activeStep === 'diet' && (
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="btn-primary text-xs"
          >
            See Carbon Dashboard <Check size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

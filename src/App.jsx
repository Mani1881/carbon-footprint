import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import ActionTracker from './components/ActionTracker';
import Flashcards from './components/Flashcards';
import { Leaf, BarChart3, Calculator as CalcIcon, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // User profile inputs for Carbon Footprint calculations
  const [userData, setUserData] = useState({
    transport: {
      carType: 'average', // none, electric, hybrid, average, suv
      carKms: 12000,
      flightsShort: 2,    // < 3 hours
      flightsLong: 0,     // > 3 hours
      publicTransportHours: 4 // hours per week
    },
    energy: {
      electricityKwh: 320, // monthly
      heatingFuel: 'gas', // none, gas, electric, oil
      heatingCost: 75,    // monthly
      cleanEnergyPortion: 15 // %
    },
    diet: {
      meatConsumption: 'average', // heavy, average, low, vegetarian, vegan
      localFoodPortion: 20, // %
      recycle: true,
      compost: false
    }
  });

  // Action Tracker state - tracks quantity of logged eco-actions
  const [loggedActions, setLoggedActions] = useState({});

  // Calculation logic to map inputs to annual CO2e in kg
  const calculateEmissions = (data) => {
    // 1. Transportation
    let carFactor = 0.18; // kg per km (average)
    if (data.transport.carType === 'none') carFactor = 0;
    else if (data.transport.carType === 'electric') carFactor = 0.04;
    else if (data.transport.carType === 'hybrid') carFactor = 0.09;
    else if (data.transport.carType === 'suv') carFactor = 0.25;
    
    const transportCar = data.transport.carKms * carFactor;
    const transportFlights = (data.transport.flightsShort * 250) + (data.transport.flightsLong * 900);
    const transportPublic = data.transport.publicTransportHours * 52 * 0.14; // 0.14 kg CO2 per hr
    const transportTotal = transportCar + transportFlights + transportPublic;

    // 2. Home Energy
    // Electricity emissions: grid average ~0.38 kg per kWh. Offset by clean energy portion.
    const energyElectricity = data.energy.electricityKwh * 12 * 0.38 * (1 - data.energy.cleanEnergyPortion / 100);
    
    // Heating fuel proxy calculation (cost based)
    let heatingFactor = 1.6;
    if (data.energy.heatingFuel === 'none') heatingFactor = 0;
    else if (data.energy.heatingFuel === 'electric') heatingFactor = 1.1;
    else if (data.energy.heatingFuel === 'oil') heatingFactor = 2.4;
    
    const energyHeating = data.energy.heatingCost * 12 * heatingFactor;
    const energyTotal = energyElectricity + energyHeating;

    // 3. Diet & Consumption
    let dietBase = 1800; // kg CO2e per year for average meat consumer
    if (data.diet.meatConsumption === 'heavy') dietBase = 2600;
    else if (data.diet.meatConsumption === 'low') dietBase = 1200;
    else if (data.diet.meatConsumption === 'vegetarian') dietBase = 850;
    else if (data.diet.meatConsumption === 'vegan') dietBase = 500;

    // Local food saves up to 12% of diet footprint
    const dietTotal = dietBase * (1 - (data.diet.localFoodPortion / 100) * 0.12);

    // 4. Waste & Recycling
    let wasteBase = 450;
    if (data.diet.recycle) wasteBase -= 160;
    if (data.diet.compost) wasteBase -= 110;
    const wasteTotal = Math.max(80, wasteBase);

    // Combined metric tons
    const totalTons = (transportTotal + energyTotal + dietTotal + wasteTotal) / 1000;

    return {
      transport: transportTotal,
      energy: energyTotal,
      diet: dietTotal,
      waste: wasteTotal,
      total: totalTons
    };
  };

  const emissions = calculateEmissions(userData);

  // Available actions & their footprint reductions (in kg CO2e)
  const actionDefinitions = [
    { id: 'commute_bike', name: 'Bike / Walk instead of Driving', category: 'transport', saving: 2.8, unit: 'trip' },
    { id: 'carpool', name: 'Carpool with others', category: 'transport', saving: 1.9, unit: 'commute' },
    { id: 'cold_wash', name: 'Wash laundry in cold water', category: 'energy', saving: 0.6, unit: 'load' },
    { id: 'thermostat', name: 'Lower thermostat by 1°C', category: 'energy', saving: 1.3, unit: 'day' },
    { id: 'plant_based_day', name: 'Fully plant-based diet day', category: 'diet', saving: 4.4, unit: 'day' },
    { id: 'no_food_waste', name: 'Zero food waste day', category: 'diet', saving: 1.1, unit: 'day' },
    { id: 'unplug_standby', name: 'Unplug standby electronics', category: 'energy', saving: 0.4, unit: 'day' },
    { id: 'avoid_plastic', name: 'Avoid single-use packaging', category: 'waste', saving: 0.8, unit: 'day' }
  ];

  // Calculate cumulative action savings in kg
  const actionSavings = Object.keys(loggedActions).reduce((acc, actionId) => {
    const actionDef = actionDefinitions.find(a => a.id === actionId);
    if (actionDef) {
      return acc + (actionDef.saving * (loggedActions[actionId] || 0));
    }
    return acc;
  }, 0);

  const handleLogAction = (actionId, change) => {
    setLoggedActions(prev => {
      const currentCount = prev[actionId] || 0;
      const nextCount = Math.max(0, currentCount + change);
      return { ...prev, [actionId]: nextCount };
    });
  };

  const handleResetActions = () => {
    setLoggedActions({});
  };

  return (
    <div>
      {/* Decorative Background Ambient Glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Upper Navigation Bar */}
      <header className="app-header">
        <div className="container py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Leaf size={24} className="glow-active rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-1.5">
                EcoTrace
                <Sparkles size={16} className="text-secondary" />
              </h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Carbon Footprint Planner</p>
            </div>
          </div>
          
          {/* Main Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              id="nav-dashboard"
              onClick={() => setActiveTab('dashboard')} 
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <BarChart3 size={15} />
              Dashboard
            </button>
            
            <button 
              id="nav-calculator"
              onClick={() => setActiveTab('calculator')} 
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'calculator' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <CalcIcon size={15} />
              Calculator
            </button>
            
            <button 
              id="nav-actions"
              onClick={() => setActiveTab('actions')} 
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'actions' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <CheckSquare size={15} />
              Green Actions
            </button>

            <button 
              id="nav-flashcards"
              onClick={() => setActiveTab('flashcards')} 
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === 'flashcards' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <BookOpen size={15} />
              Learn Facts
            </button>
          </nav>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="container">
        {activeTab === 'dashboard' && (
          <Dashboard 
            userData={userData}
            emissions={emissions} 
            actionSavings={actionSavings}
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === 'calculator' && (
          <Calculator 
            userData={userData} 
            setUserData={setUserData} 
            setActiveTab={setActiveTab} 
          />
        )}
        
        {activeTab === 'actions' && (
          <ActionTracker 
            actionDefinitions={actionDefinitions}
            loggedActions={loggedActions} 
            onLog={handleLogAction} 
            onReset={handleResetActions}
            actionSavings={actionSavings}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'flashcards' && (
          <Flashcards />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-gray-500">
        <p className="mb-2">🌱 EcoTrace App - Designed for sustainable individuals.</p>
      </footer>
    </div>
  );
}

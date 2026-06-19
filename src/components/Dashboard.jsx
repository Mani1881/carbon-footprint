/**
 * @fileoverview Dashboard component displaying an overview of the user's carbon footprint.
 * Includes a hero card with climate rating, stat cards, a donut breakdown chart,
 * global comparisons bar chart, and personalized sustainability insights.
 * @module Dashboard
 */

import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import {
  CO2_PER_TREE_PER_YEAR,
  AVG_CAR_EMISSION_PER_KM,
  FOOTPRINT_THRESHOLDS,
  GLOBAL_COMPARISONS,
} from '../constants.js';

import StatCards from './dashboard/StatCards.jsx';
import BreakdownChart from './dashboard/BreakdownChart.jsx';
import ComparisonsChart from './dashboard/ComparisonsChart.jsx';
import InsightsPanel from './dashboard/InsightsPanel.jsx';

/**
 * Dashboard component showing the user's carbon footprint summary.
 *
 * @param {Object} props
 * @param {Object} props.userData - User input data for personalized insights
 * @param {import('../utils.js').EmissionsResult} props.emissions - Calculated emissions breakdown
 * @param {number} props.actionSavings - Total CO2e saved from logged actions (kg)
 * @param {Function} props.setActiveTab - Callback to switch the active navigation tab
 * @returns {React.ReactElement} Dashboard UI
 */
const Dashboard = memo(function Dashboard({ userData, emissions, actionSavings, setActiveTab }) {
  const { transport, energy, diet, waste, total } = emissions;
  
  /**
   * Memoized derived metrics for stat cards and charts.
   * Only recalculates when emissions or actionSavings change.
   */
  const derivedMetrics = useMemo(() => {
    const treesEquiv = Math.round((actionSavings) / CO2_PER_TREE_PER_YEAR * 10) / 10 || 0;
    const milesSaved = Math.round(actionSavings / AVG_CAR_EMISSION_PER_KM) || 0;
    
    const totalKg = (transport + energy + diet + waste) || 1;
    const transportPct = Math.round((transport / totalKg) * 100);
    const energyPct = Math.round((energy / totalKg) * 100);
    const dietPct = Math.round((diet / totalKg) * 100);
    const wastePct = Math.round((waste / totalKg) * 100);

    // SVG Donut calculations
    const radius = 50;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    
    const tDash = (transport / totalKg) * circumference;
    const eDash = (energy / totalKg) * circumference;
    const dDash = (diet / totalKg) * circumference;
    const wDash = (waste / totalKg) * circumference;

    let offset = 0;
    const tOffset = offset;
    offset += tDash;
    const eOffset = offset;
    offset += eDash;
    const dOffset = offset;
    offset += dDash;
    const wOffset = offset;

    return {
      treesEquiv, milesSaved, totalKg,
      transportPct, energyPct, dietPct, wastePct,
      radius, strokeWidth, circumference,
      tDash, eDash, dDash, wDash,
      tOffset, eOffset, dOffset, wOffset,
    };
  }, [transport, energy, diet, waste, actionSavings]);

  /**
   * Memoized climate status determination.
   */
  const status = useMemo(() => {
    if (total < FOOTPRINT_THRESHOLDS.sustainable) {
      return {
        text: 'Climate Hero (Sustainable)',
        theme: 'var(--primary)',
        advice: 'Incredible! Your footprint is under the 2-ton sustainable target. Keep inspiring others!',
      };
    }
    if (total < FOOTPRINT_THRESHOLDS.moderate) {
      return {
        text: 'Moderate Footprint',
        theme: 'var(--secondary)',
        advice: "Great job! You're below the US average, but there is still room to reach the 2-ton climate goal.",
      };
    }
    return {
      text: 'High Footprint',
      theme: 'var(--error)',
      advice: 'Your carbon footprint is higher than average. Use the calculator and actions tab to start reducing your impact!',
    };
  }, [total]);

  /**
   * Memoized comparison data for the bar chart.
   */
  const comparisons = useMemo(() => {
    const items = [
      { name: 'Your Footprint', value: total, color: 'var(--primary)', isUser: true },
      ...GLOBAL_COMPARISONS,
    ];
    const maxVal = Math.max(...items.map((c) => c.value));
    return { items, maxVal };
  }, [total]);

  return (
    <div className="animate-fade-in">
      {/* Hero Header Card */}
      <section aria-label="Carbon footprint summary" className="glass-panel p-6 md:p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 md:max-w-xl">
          <span className="badge badge-diet mb-3">🌱 EcoTrace Live Dashboard</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Your Annual Carbon Footprint: <span style={{ color: status.theme }} aria-live="polite">{total.toFixed(1)} Tons CO2e</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-4">
            {status.advice}
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('calculator')} 
              className="btn-primary"
              aria-label="Navigate to carbon calculator to update your inputs"
            >
              Update Calculator <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button 
              onClick={() => setActiveTab('actions')} 
              className="btn-secondary"
              aria-label="Navigate to log your daily green actions"
            >
              Log Daily Actions
            </button>
          </div>
        </div>
        
        {/* Animated Gauge */}
        <div className="flex flex-col items-center justify-center relative z-10 bg-opacity-20 bg-black p-4 rounded-2xl border border-gray-800" aria-label={`Climate rating gauge showing ${total.toFixed(1)} tons`}>
          <span className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold" aria-hidden="true">Climate Rating</span>
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" role="img" aria-label={`Gauge showing ${total.toFixed(1)} out of 20 tons CO2e. Rating: ${total < FOOTPRINT_THRESHOLDS.sustainable ? 'Eco' : total < FOOTPRINT_THRESHOLDS.moderate ? 'Moderate' : 'High'}`}>
              <title>Climate Rating Gauge</title>
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke={status.theme} 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (Math.min(total, FOOTPRINT_THRESHOLDS.maxGauge) / FOOTPRINT_THRESHOLDS.maxGauge) * 251.2}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
              <span className="text-2xl font-bold font-display">{total.toFixed(1)}t</span>
              <span className="text-[10px] text-gray-400 font-semibold px-2 py-0.5 rounded-full bg-gray-800 uppercase mt-1">
                {total < FOOTPRINT_THRESHOLDS.sustainable ? 'Eco' : total < FOOTPRINT_THRESHOLDS.moderate ? 'Moderate' : 'High'}
              </span>
            </div>
          </div>
        </div>

        {/* Ambient glow in background */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" aria-hidden="true"></div>
      </section>

      {/* Grid of Stats Cards */}
      <StatCards actionSavings={actionSavings} derivedMetrics={derivedMetrics} />

      {/* Main Charts & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Footprint Category Breakdown (Donut + Legend) */}
        <BreakdownChart total={total} emissions={emissions} derivedMetrics={derivedMetrics} />

        {/* Footprint Comparison Chart */}
        <ComparisonsChart comparisons={comparisons} />
      </div>

      {/* Personalized Insights Panel */}
      <InsightsPanel userData={userData} setActiveTab={setActiveTab} />
    </div>
  );
});

Dashboard.propTypes = {
  /** User input data used for generating personalized insights */
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
  /** Calculated emissions breakdown from calculateEmissions() */
  emissions: PropTypes.shape({
    transport: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    diet: PropTypes.number.isRequired,
    waste: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  /** Total CO2e saved from logged eco-actions in kg */
  actionSavings: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Dashboard;

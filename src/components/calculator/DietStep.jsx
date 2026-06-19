import { memo } from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

/**
 * Dietary preference options.
 * @readonly
 */
const DIET_OPTIONS = [
  { value: 'heavy', label: 'Meat Lover' },
  { value: 'average', label: 'Average Meat' },
  { value: 'low', label: 'Low Meat' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
];

const DietStep = memo(function DietStep({ dietData, handleDietChange }) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in" role="tabpanel" id="calc-panel-diet" aria-labelledby="calc-tab-diet">
      <h3 className="text-xl font-bold border-b border-white/5 pb-2">Diet & Consumption</h3>

      {/* Meat consumption */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-gray-300 mb-2">Dietary Preferences</legend>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Select your dietary preference">
          {DIET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={dietData.meatConsumption === opt.value}
              onClick={() => handleDietChange('meatConsumption', opt.value)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${dietData.meatConsumption === opt.value ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Local Food portion */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <label htmlFor="local-food" className="font-semibold text-gray-300">Locally Sourced Food Ratio</label>
          <span className="text-emerald-400 font-bold" aria-live="polite">{dietData.localFoodPortion}%</span>
        </div>
        <input 
          id="local-food"
          type="range" 
          min="0" 
          max="100" 
          step="5"
          value={dietData.localFoodPortion}
          onChange={(e) => handleDietChange('localFoodPortion', parseInt(e.target.value, 10))}
          aria-label="Percentage of food sourced locally"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={dietData.localFoodPortion}
          aria-valuetext={`${dietData.localFoodPortion} percent locally sourced`}
        />
        <span className="text-[10px] text-gray-500">Buying local reduces food transport emissions (&quot;food miles&quot;).</span>
      </div>

      {/* Household Recycling / Waste habits */}
      <fieldset className="flex flex-col gap-3 border-t border-white/5 pt-4">
        <legend className="text-sm font-semibold text-gray-300 mb-2">Waste Reduction Habits</legend>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={dietData.recycle}
            aria-label="Toggle regular recycling"
            onClick={() => handleDietChange('recycle', !dietData.recycle)}
            className={`flex-1 flex items-center justify-between p-3 rounded-xl border transition-all ${dietData.recycle ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <span className="text-xs font-bold uppercase">We Recycle Regularly</span>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${dietData.recycle ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-gray-600'}`} aria-hidden="true">
              {dietData.recycle && <Check size={12} strokeWidth={3} />}
            </div>
          </button>

          <button
            type="button"
            role="switch"
            aria-checked={dietData.compost}
            aria-label="Toggle organic composting"
            onClick={() => handleDietChange('compost', !dietData.compost)}
            className={`flex-1 flex items-center justify-between p-3 rounded-xl border transition-all ${dietData.compost ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <span className="text-xs font-bold uppercase">We Compost Organic Waste</span>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${dietData.compost ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-gray-600'}`} aria-hidden="true">
              {dietData.compost && <Check size={12} strokeWidth={3} />}
            </div>
          </button>
        </div>
      </fieldset>
    </div>
  );
});

DietStep.propTypes = {
  dietData: PropTypes.shape({
    meatConsumption: PropTypes.string.isRequired,
    localFoodPortion: PropTypes.number.isRequired,
    recycle: PropTypes.bool.isRequired,
    compost: PropTypes.bool.isRequired,
  }).isRequired,
  handleDietChange: PropTypes.func.isRequired,
};

export default DietStep;

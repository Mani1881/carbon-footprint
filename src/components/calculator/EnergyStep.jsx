import { memo } from 'react';
import PropTypes from 'prop-types';

const EnergyStep = memo(function EnergyStep({ energyData, handleEnergyChange }) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in" role="tabpanel" id="calc-panel-energy" aria-labelledby="calc-tab-energy">
      <h3 className="text-xl font-bold border-b border-white/5 pb-2">Home Utilities</h3>

      {/* Electricity Kwh */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <label htmlFor="electricity-kwh" className="font-semibold text-gray-300">Monthly Household Electricity</label>
          <span className="text-emerald-400 font-bold" aria-live="polite">{energyData.electricityKwh} kWh / month</span>
        </div>
        <input 
          id="electricity-kwh"
          type="range" 
          min="0" 
          max="1200" 
          step="20"
          value={energyData.electricityKwh}
          onChange={(e) => handleEnergyChange('electricityKwh', parseInt(e.target.value, 10))}
          aria-label="Monthly electricity consumption in kilowatt hours"
          aria-valuemin={0}
          aria-valuemax={1200}
          aria-valuenow={energyData.electricityKwh}
          aria-valuetext={`${energyData.electricityKwh} kilowatt hours per month`}
        />
        <span className="text-[10px] text-gray-500">Average household uses around 300-400 kWh/month.</span>
      </div>

      {/* Renewable portion */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <label htmlFor="clean-energy" className="font-semibold text-gray-300">Renewable Energy Portion (Green Grid or Solar)</label>
          <span className="text-emerald-400 font-bold" aria-live="polite">{energyData.cleanEnergyPortion}%</span>
        </div>
        <input 
          id="clean-energy"
          type="range" 
          min="0" 
          max="100" 
          step="5"
          value={energyData.cleanEnergyPortion}
          onChange={(e) => handleEnergyChange('cleanEnergyPortion', parseInt(e.target.value, 10))}
          aria-label="Percentage of electricity from renewable sources"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={energyData.cleanEnergyPortion}
          aria-valuetext={`${energyData.cleanEnergyPortion} percent renewable energy`}
        />
        <span className="text-[10px] text-gray-500">Reduces direct electricity emissions. Set to 100% if on a certified green supplier.</span>
      </div>

      {/* Heating Source */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="heating-fuel" className="text-sm font-semibold text-gray-300">Heating Energy Source</label>
          <select 
            id="heating-fuel"
            value={energyData.heatingFuel}
            onChange={(e) => handleEnergyChange('heatingFuel', e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-gray-300 outline-none focus:border-emerald-500"
            aria-label="Select your heating energy source"
          >
            <option value="none" className="bg-gray-950">No Active Heating</option>
            <option value="gas" className="bg-gray-950">Natural Gas</option>
            <option value="electric" className="bg-gray-950">Electric / Heat Pump</option>
            <option value="oil" className="bg-gray-950">Fuel Oil</option>
          </select>
        </div>

        {energyData.heatingFuel !== 'none' && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="heating-cost" className="font-semibold text-gray-300">Average Heating Bill</label>
              <span className="text-emerald-400 font-bold" aria-live="polite">${energyData.heatingCost} / month</span>
            </div>
            <input 
              id="heating-cost"
              type="range" 
              min="0" 
              max="300" 
              step="10"
              value={energyData.heatingCost}
              onChange={(e) => handleEnergyChange('heatingCost', parseInt(e.target.value, 10))}
              aria-label="Monthly heating bill in dollars"
              aria-valuemin={0}
              aria-valuemax={300}
              aria-valuenow={energyData.heatingCost}
              aria-valuetext={`${energyData.heatingCost} dollars per month`}
            />
          </div>
        )}
      </div>
    </div>
  );
});

EnergyStep.propTypes = {
  energyData: PropTypes.shape({
    electricityKwh: PropTypes.number.isRequired,
    cleanEnergyPortion: PropTypes.number.isRequired,
    heatingFuel: PropTypes.string.isRequired,
    heatingCost: PropTypes.number.isRequired,
  }).isRequired,
  handleEnergyChange: PropTypes.func.isRequired,
};

export default EnergyStep;

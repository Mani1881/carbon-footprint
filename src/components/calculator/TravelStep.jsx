import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Vehicle type options for the transportation profile.
 * @readonly
 */
const VEHICLE_OPTIONS = [
  { value: 'none', label: 'No Car' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'average', label: 'Petrol/Diesel' },
  { value: 'suv', label: 'SUV/Truck' },
];

const TravelStep = memo(function TravelStep({ transportData, handleTransportChange }) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in" role="tabpanel" id="calc-panel-travel" aria-labelledby="calc-tab-travel">
      <h3 className="text-xl font-bold border-b border-white/5 pb-2">Transportation Profile</h3>
      
      {/* Vehicle Type */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-gray-300 mb-2">Primary Commuting Vehicle</legend>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Select your vehicle type">
          {VEHICLE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={transportData.carType === opt.value}
              onClick={() => handleTransportChange('carType', opt.value)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${transportData.carType === opt.value ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Car Annual Mileage */}
      {transportData.carType !== 'none' && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="car-kms" className="font-semibold text-gray-300">Annual Driving Mileage</label>
            <span className="text-emerald-400 font-bold" aria-live="polite">{transportData.carKms.toLocaleString()} km / year</span>
          </div>
          <input 
            id="car-kms"
            type="range" 
            min="0" 
            max="40000" 
            step="1000"
            value={transportData.carKms}
            onChange={(e) => handleTransportChange('carKms', parseInt(e.target.value, 10))}
            aria-label="Annual driving mileage in kilometers"
            aria-valuemin={0}
            aria-valuemax={40000}
            aria-valuenow={transportData.carKms}
            aria-valuetext={`${transportData.carKms.toLocaleString()} kilometers per year`}
          />
          <span className="text-[10px] text-gray-500">Average car driver logs roughly 12,000 km annually.</span>
        </div>
      )}

      {/* Public Transport */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <label htmlFor="public-transport" className="font-semibold text-gray-300">Public Transit (Train, Bus, Subway)</label>
          <span className="text-emerald-400 font-bold" aria-live="polite">{transportData.publicTransportHours} hours / week</span>
        </div>
        <input 
          id="public-transport"
          type="range" 
          min="0" 
          max="40" 
          step="1"
          value={transportData.publicTransportHours}
          onChange={(e) => handleTransportChange('publicTransportHours', parseInt(e.target.value, 10))}
          aria-label="Weekly public transit hours"
          aria-valuemin={0}
          aria-valuemax={40}
          aria-valuenow={transportData.publicTransportHours}
          aria-valuetext={`${transportData.publicTransportHours} hours per week`}
        />
      </div>

      {/* Flights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="flights-short" className="font-semibold text-gray-300">Short Flights (&lt; 3 hrs)</label>
            <span className="text-emerald-400 font-bold" aria-live="polite">{transportData.flightsShort} flights / year</span>
          </div>
          <input 
            id="flights-short"
            type="range" 
            min="0" 
            max="20" 
            step="1"
            value={transportData.flightsShort}
            onChange={(e) => handleTransportChange('flightsShort', parseInt(e.target.value, 10))}
            aria-label="Number of short flights per year"
            aria-valuemin={0}
            aria-valuemax={20}
            aria-valuenow={transportData.flightsShort}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="flights-long" className="font-semibold text-gray-300">Long Flights (&gt; 3 hrs)</label>
            <span className="text-emerald-400 font-bold" aria-live="polite">{transportData.flightsLong} flights / year</span>
          </div>
          <input 
            id="flights-long"
            type="range" 
            min="0" 
            max="10" 
            step="1"
            value={transportData.flightsLong}
            onChange={(e) => handleTransportChange('flightsLong', parseInt(e.target.value, 10))}
            aria-label="Number of long flights per year"
            aria-valuemin={0}
            aria-valuemax={10}
            aria-valuenow={transportData.flightsLong}
          />
        </div>
      </div>
    </div>
  );
});

TravelStep.propTypes = {
  transportData: PropTypes.shape({
    carType: PropTypes.string.isRequired,
    carKms: PropTypes.number.isRequired,
    flightsShort: PropTypes.number.isRequired,
    flightsLong: PropTypes.number.isRequired,
    publicTransportHours: PropTypes.number.isRequired,
  }).isRequired,
  handleTransportChange: PropTypes.func.isRequired,
};

export default TravelStep;

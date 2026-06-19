import { memo } from 'react';
import PropTypes from 'prop-types';
import { Award, Car, Flame, Utensils, ArrowRight } from 'lucide-react';

const InsightsPanel = memo(function InsightsPanel({ userData, setActiveTab }) {
  return (
    <section aria-label="Personalized sustainability insights" className="glass-panel p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Award size={18} className="text-yellow-400" aria-hidden="true" />
        Personalized Sustainability Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Transportation Insight */}
        <article className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
              <Car size={16} aria-hidden="true" />
              <span>Travel Stats</span>
            </div>
            <p className="text-xs text-gray-300">
              {userData.transport.carKms > 15000 
                ? "Your high vehicle mileage is a prime area for carbon savings. Commuting by bicycle or bus just 2 days a week could reduce your footprint by 0.8 tons."
                : userData.transport.carType === 'electric' 
                ? "Outstanding job choosing an electric vehicle! This choice reduces your transport emissions by over 80% compared to a gasoline vehicle."
                : "Your transportation is fairly efficient. To reduce it further, explore direct flights for long journeys and optimize tire pressure to save fuel."}
            </p>
          </div>
          {userData.transport.carKms > 0 && (
            <button onClick={() => setActiveTab('actions')} className="btn-insight-cyan" aria-label="Explore transit related green actions">
              Explore transit actions <ArrowRight size={12} aria-hidden="true" />
            </button>
          )}
        </article>

        {/* Energy Insight */}
        <article className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 font-semibold mb-2">
              <Flame size={16} aria-hidden="true" />
              <span>Home Utility</span>
            </div>
            <p className="text-xs text-gray-300">
              {userData.energy.cleanEnergyPortion < 50
                ? `Your utility electricity is derived from fossil fuels. Increasing your green offset percentage to 100% could shave off another ${(userData.energy.electricityKwh * 12 * 0.4 * 0.001).toFixed(1)} tons CO2e.`
                : "Brilliant! You use a high percentage of clean/renewable energy for your household, making you a neighborhood climate leader."}
            </p>
          </div>
          <button onClick={() => setActiveTab('calculator')} className="btn-insight-yellow" aria-label="Adjust your home energy inputs in the calculator">
            Adjust energy inputs <ArrowRight size={12} aria-hidden="true" />
          </button>
        </article>

        {/* Food and Diet Insight */}
        <article className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
              <Utensils size={16} aria-hidden="true" />
              <span>Dietary Choices</span>
            </div>
            <p className="text-xs text-gray-300">
              {userData.diet.meatConsumption === 'heavy' || userData.diet.meatConsumption === 'average'
                ? "Eating beef and lamb has high environmental costs. Transitioning to poultry, fish, or vegetarian meals for 3 days a week saves up to 450 kg CO2e annually."
                : "Your plant-based diet is highly eco-efficient. Diet is one of the most powerful individual levers for combatting global warming."}
            </p>
          </div>
          <button onClick={() => setActiveTab('actions')} className="btn-insight-emerald" aria-label="Try a diet related green action">
            Try a diet action <ArrowRight size={12} aria-hidden="true" />
          </button>
        </article>
      </div>
    </section>
  );
});

InsightsPanel.propTypes = {
  userData: PropTypes.shape({
    transport: PropTypes.shape({
      carType: PropTypes.string.isRequired,
      carKms: PropTypes.number.isRequired,
    }).isRequired,
    energy: PropTypes.shape({
      electricityKwh: PropTypes.number.isRequired,
      cleanEnergyPortion: PropTypes.number.isRequired,
    }).isRequired,
    diet: PropTypes.shape({
      meatConsumption: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default InsightsPanel;

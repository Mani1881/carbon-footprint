import { memo } from 'react';
import PropTypes from 'prop-types';
import { TrendingDown, Leaf, Car, Award } from 'lucide-react';

const StatCards = memo(function StatCards({ actionSavings, derivedMetrics }) {
  const { treesEquiv, milesSaved } = derivedMetrics;

  return (
    <section aria-label="Impact statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4" role="status" aria-label={`Carbon saved: ${actionSavings.toFixed(1)} kilograms from logged actions`}>
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <TrendingDown size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Carbon Saved</p>
          <h3 className="text-2xl font-bold font-display">{actionSavings.toFixed(1)} kg</h3>
          <p className="text-xs text-emerald-400 mt-1">Logged actions impact</p>
        </div>
      </div>

      <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4" aria-label={`Trees equivalent: ${treesEquiv} trees absorbing CO2 annually`}>
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <Leaf size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Trees Equivalent</p>
          <h3 className="text-2xl font-bold font-display">{treesEquiv} Trees</h3>
          <p className="text-xs text-gray-400 mt-1">Absorbed CO2 annually</p>
        </div>
      </div>

      <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4" aria-label={`Driving offset: ${milesSaved} kilometers of car commute equivalent`}>
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <Car size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Driving Offset</p>
          <h3 className="text-2xl font-bold font-display">{milesSaved} km</h3>
          <p className="text-xs text-gray-400 mt-1">Average car commute equivalent</p>
        </div>
      </div>

      <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4" aria-label={`Eco streak: ${actionSavings > 0 ? 'Active' : 'Idle'}`}>
        <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
          <Award size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Eco Streak</p>
          <h3 className="text-2xl font-bold font-display">{actionSavings > 0 ? '🔥 Active' : '⏱️ Idle'}</h3>
          <p className="text-xs text-gray-400 mt-1">Log tasks to keep going</p>
        </div>
      </div>
    </section>
  );
});

StatCards.propTypes = {
  actionSavings: PropTypes.number.isRequired,
  derivedMetrics: PropTypes.shape({
    treesEquiv: PropTypes.number.isRequired,
    milesSaved: PropTypes.number.isRequired,
  }).isRequired,
};

export default StatCards;

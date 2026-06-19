import { memo } from 'react';
import { 
  Bike, 
  Users, 
  Droplet, 
  Thermometer, 
  ShoppingBag, 
  Trash2, 
  RotateCcw,
  Zap,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

const ActionTracker = memo(function ActionTracker({ 
  actionDefinitions, 
  loggedActions, 
  onLog, 
  onReset, 
  actionSavings,
  setActiveTab 
}) {
  
  // Icon mapper
  const getActionIcon = (id) => {
    switch (id) {
      case 'commute_bike': return <Bike size={18} />;
      case 'carpool': return <Users size={18} />;
      case 'cold_wash': return <Droplet size={18} />;
      case 'thermostat': return <Thermometer size={18} />;
      case 'plant_based_day': return <ShoppingBag size={18} />;
      case 'no_food_waste': return <RotateCcw size={18} />;
      case 'unplug_standby': return <Zap size={18} />;
      case 'avoid_plastic': return <Trash2 size={18} />;
      default: return <Bike size={18} />;
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'transport': return 'badge-transport';
      case 'energy': return 'badge-energy';
      case 'diet': return 'badge-diet';
      case 'waste': return 'badge-diet bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'badge-transport';
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="glass-panel p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
            <TrendingDown className="text-emerald-400" />
            Green Action Tracker
          </h2>
          <p className="text-gray-300 text-sm md:max-w-lg">
            Track small, daily changes in your habits. Real-world changes add up! Every action you log deducts carbon emissions from your calculator footprint in real-time.
          </p>
        </div>

        <div className="glass-panel p-4 bg-emerald-500/5 border-emerald-500/20 text-center min-w-[160px] relative z-10">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total Deducted</span>
          <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">{actionSavings.toFixed(1)} kg</h3>
          <span className="text-[10px] text-gray-500 block mt-1">CO2e Saved</span>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"></div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-300">Log Daily Tasks</h3>
        {actionSavings > 0 && (
          <button 
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition-all px-3 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
          >
            <RotateCcw size={14} /> Clear Log Data
          </button>
        )}
      </div>

      {/* Grid of Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {actionDefinitions.map((act) => {
          const count = loggedActions[act.id] || 0;
          const savedAmount = count * act.saving;

          return (
            <div 
              key={act.id} 
              className={`glass-panel p-5 transition-all flex justify-between items-center ${count > 0 ? 'border-emerald-500/30 bg-emerald-500/[0.02]' : ''}`}
            >
              <div className="flex gap-4 items-start pr-4">
                <div className={`p-3 rounded-xl ${count > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-white/5 text-gray-400 border border-white/5'}`}>
                  {getActionIcon(act.id)}
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge ${getCategoryBadgeClass(act.category)} uppercase text-[9px] font-bold tracking-wide`}>
                      {act.category}
                    </span>
                    {count > 0 && (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        Logged {count}x
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-gray-200 mt-1">{act.name}</h4>
                  <p className="text-[10px] text-gray-400">
                    Saves <strong className="text-gray-300">{act.saving} kg</strong> CO2e per {act.unit}
                  </p>
                </div>
              </div>

              {/* Adjust Controls */}
              <div className="flex flex-col items-center gap-2 min-w-[90px]">
                <div className="flex items-center bg-black/30 border border-white/5 rounded-lg p-0.5">
                  <button 
                    onClick={() => onLog(act.id, -1)}
                    disabled={count === 0}
                    className="w-7 h-7 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-display">{count}</span>
                  <button 
                    onClick={() => onLog(act.id, 1)}
                    className="w-7 h-7 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
                {savedAmount > 0 && (
                  <span className="text-[10px] text-emerald-400 font-bold">
                    -{savedAmount.toFixed(1)} kg
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating CTA */}
      <div className="glass-panel p-6 text-center">
        <h4 className="text-base font-bold mb-2">Ready to see your updated carbon dashboard?</h4>
        <p className="text-xs text-gray-400 mb-4">Your dashboard metrics are automatically synchronized with your actions.</p>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="btn-primary mx-auto"
        >
          View Updated Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
});

export default ActionTracker;

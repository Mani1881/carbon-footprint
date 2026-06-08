import React from 'react';
import { 
  TrendingDown, 
  Leaf, 
  Car, 
  Flame, 
  Utensils, 
  Trash2, 
  Zap, 
  Globe, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function Dashboard({ userData, emissions, actionSavings, setActiveTab }) {
  const { transport, energy, diet, waste, total } = emissions;
  
  // Calculate equivalencies
  const treesEquiv = Math.round((actionSavings) / 22 * 10) / 10 || 0; // 1 tree absorbs ~22kg CO2 per year
  const milesSaved = Math.round(actionSavings / 0.18) || 0; // Average car emits 0.18kg per km
  
  // Category percentages for the breakdown
  const totalKg = (transport + energy + diet + waste) || 1;
  const transportPct = Math.round((transport / totalKg) * 100);
  const energyPct = Math.round((energy / totalKg) * 100);
  const dietPct = Math.round((diet / totalKg) * 100);
  const wastePct = Math.round((waste / totalKg) * 100);

  // SVG Donut calculations
  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate segments
  const tDash = (transport / totalKg) * circumference;
  const eDash = (energy / totalKg) * circumference;
  const dDash = (diet / totalKg) * circumference;
  const wDash = (waste / totalKg) * circumference;

  // Offset accumulators
  let offset = 0;
  const tOffset = offset;
  offset += tDash;
  const eOffset = offset;
  offset += eDash;
  const dOffset = offset;
  offset += dDash;
  const wOffset = offset;

  // Determine user level description
  let statusText = "High Footprint";
  let statusColor = "text-red-500";
  let statusTheme = "var(--error)";
  let statusAdvice = "Your carbon footprint is higher than average. Use the calculator and actions tab to start reducing your impact!";

  if (total < 2.0) {
    statusText = "Climate Hero (Sustainable)";
    statusColor = "text-emerald-400";
    statusTheme = "var(--primary)";
    statusAdvice = "Incredible! Your footprint is under the 2-ton sustainable target. Keep inspiring others!";
  } else if (total < 6.0) {
    statusText = "Moderate Footprint";
    statusColor = "text-cyan-400";
    statusTheme = "var(--secondary)";
    statusAdvice = "Great job! You're below the US average, but there is still room to reach the 2-ton climate goal.";
  }

  // Comparisons data
  const comparisons = [
    { name: 'Your Footprint', value: total, color: 'var(--primary)', isUser: true },
    { name: 'Sustainable Goal', value: 2.0, color: 'var(--secondary)' },
    { name: 'Global Average', value: 4.5, color: '#a7f3d0' },
    { name: 'US Average', value: 16.0, color: '#f87171' }
  ];

  const maxVal = Math.max(...comparisons.map(c => c.value));

  return (
    <div className="animate-fade-in">
      {/* Hero Header Card */}
      <div className="glass-panel p-6 md:p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 md:max-w-xl">
          <span className="badge badge-diet mb-3">🌱 EcoTrace Live Dashboard</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Your Annual Carbon Footprint: <span style={{ color: statusTheme }}>{total.toFixed(1)} Tons CO2e</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-4">
            {statusAdvice}
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('calculator')} 
              className="btn-primary"
            >
              Update Calculator <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('actions')} 
              className="btn-secondary"
            >
              Log Daily Actions
            </button>
          </div>
        </div>
        
        {/* Animated Gauge */}
        <div className="flex flex-col items-center justify-center relative z-10 bg-opacity-20 bg-black p-4 rounded-2xl border border-gray-800">
          <span className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Climate Rating</span>
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Simple SVG Gauge Background */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke={statusTheme} 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (Math.min(total, 20) / 20) * 251.2}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold font-display">{total.toFixed(1)}t</span>
              <span className="text-[10px] text-gray-400 font-semibold px-2 py-0.5 rounded-full bg-gray-800 uppercase mt-1">
                {total < 2.0 ? 'Eco' : total < 6.0 ? 'Moderate' : 'High'}
              </span>
            </div>
          </div>
        </div>

        {/* Ambient glow in background */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Carbon Saved</p>
            <h3 className="text-2xl font-bold font-display">{actionSavings.toFixed(1)} kg</h3>
            <p className="text-xs text-emerald-400 mt-1">Logged actions impact</p>
          </div>
        </div>

        <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Leaf size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Trees Equivalent</p>
            <h3 className="text-2xl font-bold font-display">{treesEquiv} Trees</h3>
            <p className="text-xs text-gray-400 mt-1">Absorbed CO2 annually</p>
          </div>
        </div>

        <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Car size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Driving Offset</p>
            <h3 className="text-2xl font-bold font-display">{milesSaved} km</h3>
            <p className="text-xs text-gray-400 mt-1">Average car commute equivalent</p>
          </div>
        </div>

        <div className="glass-panel glass-panel-hover p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Eco Streak</p>
            <h3 className="text-2xl font-bold font-display">{actionSavings > 0 ? '🔥 Active' : '⏱️ Idle'}</h3>
            <p className="text-xs text-gray-400 mt-1">Log tasks to keep going</p>
          </div>
        </div>
      </div>

      {/* Main Charts & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Footprint Category Breakdown (Donut + Legend) */}
        <div className="glass-panel p-6 lg:col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              <Globe size={18} className="text-emerald-400" />
              Footprint Category Breakdown
            </h3>
            <p className="text-xs text-gray-400 mb-6">Understand which parts of your lifestyle contribute the most emissions</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* SVG Donut */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} fill="none" />
                
                {/* Transport Segment */}
                {tDash > 0 && (
                  <circle 
                    cx="60" cy="60" r={radius} 
                    stroke="var(--secondary)" 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={`${tDash} ${circumference}`} 
                    strokeDashoffset={-tOffset}
                    fill="none" 
                    className="transition-all duration-500"
                  />
                )}
                
                {/* Energy Segment */}
                {eDash > 0 && (
                  <circle 
                    cx="60" cy="60" r={radius} 
                    stroke="var(--warning)" 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={`${eDash} ${circumference}`} 
                    strokeDashoffset={-eOffset}
                    fill="none" 
                    className="transition-all duration-500"
                  />
                )}

                {/* Diet Segment */}
                {dDash > 0 && (
                  <circle 
                    cx="60" cy="60" r={radius} 
                    stroke="var(--primary)" 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={`${dDash} ${circumference}`} 
                    strokeDashoffset={-dOffset}
                    fill="none" 
                    className="transition-all duration-500"
                  />
                )}

                {/* Waste Segment */}
                {wDash > 0 && (
                  <circle 
                    cx="60" cy="60" r={radius} 
                    stroke="var(--accent)" 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={`${wDash} ${circumference}`} 
                    strokeDashoffset={-wOffset}
                    fill="none" 
                    className="transition-all duration-500"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold">{total.toFixed(1)}t</span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Tons/Year</span>
              </div>
            </div>

            {/* Legend & Details */}
            <div className="flex flex-col gap-4 w-full sm:w-auto min-w-[200px]">
              <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-sm font-semibold">Transportation</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{(transport/1000).toFixed(1)}t</span>
                  <span className="text-[10px] text-gray-400 ml-1.5">({transportPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-semibold">Home Energy</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{(energy/1000).toFixed(1)}t</span>
                  <span className="text-[10px] text-gray-400 ml-1.5">({energyPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-semibold">Diet & Consumption</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{(diet/1000).toFixed(1)}t</span>
                  <span className="text-[10px] text-gray-400 ml-1.5">({dietPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-semibold">Waste & Recycling</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{(waste/1000).toFixed(1)}t</span>
                  <span className="text-[10px] text-gray-400 ml-1.5">({wastePct}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footprint Comparison Chart */}
        <div className="glass-panel p-6 lg:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              <TrendingDown size={18} className="text-cyan-400" />
              Global Comparisons
            </h3>
            <p className="text-xs text-gray-400 mb-6">How your annual footprint stacks up against the world (Tons CO2e)</p>
          </div>

          <div className="flex flex-col gap-5 py-2">
            {comparisons.map((c, i) => {
              const widthPct = Math.max(12, (c.value / maxVal) * 100);
              return (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={c.isUser ? "text-emerald-400 font-bold flex items-center gap-1" : "text-gray-300"}>
                      {c.name} {c.isUser && '👤'}
                    </span>
                    <span className="font-bold">{c.value.toFixed(1)} t</span>
                  </div>
                  <div className="h-7 w-full bg-white/5 rounded-lg overflow-hidden border border-white/5 relative flex items-center">
                    <div 
                      style={{ 
                        width: `${widthPct}%`, 
                        background: c.isUser ? 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)' : c.color,
                        boxShadow: c.isUser ? '0 0 15px rgba(16,185,129,0.3)' : 'none'
                      }}
                      className="h-full rounded-r-md transition-all duration-1000 ease-out"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-xs text-cyan-300">
            💡 The UN Climate Target recommends keeping personal carbon footprint under <strong>2.0 tons</strong> by 2030 to combat climate change.
          </div>
        </div>

      </div>

      {/* Personalized Insights Panel */}
      <div className="glass-panel p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award size={18} className="text-yellow-400" />
          Personalized Sustainability Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Transportation Insight */}
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                <Car size={16} />
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
              <button onClick={() => setActiveTab('actions')} className="btn-insight-cyan">
                Explore transit actions <ArrowRight size={12} />
              </button>
            )}
          </div>

          {/* Energy Insight */}
          <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 font-semibold mb-2">
                <Flame size={16} />
                <span>Home Utility</span>
              </div>
              <p className="text-xs text-gray-300">
                {userData.energy.cleanEnergyPortion < 50
                  ? `Your utility electricity is derived from fossil fuels. Increasing your green offset percentage to 100% could shave off another ${(userData.energy.electricityKwh * 12 * 0.4 * 0.001).toFixed(1)} tons CO2e.`
                  : "Brilliant! You use a high percentage of clean/renewable energy for your household, making you a neighborhood climate leader."}
              </p>
            </div>
            <button onClick={() => setActiveTab('calculator')} className="btn-insight-yellow">
              Adjust energy inputs <ArrowRight size={12} />
            </button>
          </div>

          {/* Food and Diet Insight */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                <Utensils size={16} />
                <span>Dietary Choices</span>
              </div>
              <p className="text-xs text-gray-300">
                {userData.diet.meatConsumption === 'heavy' || userData.diet.meatConsumption === 'average'
                  ? "Eating beef and lamb has high environmental costs. Transitioning to poultry, fish, or vegetarian meals for 3 days a week saves up to 450 kg CO2e annually."
                  : "Your plant-based diet is highly eco-efficient. Diet is one of the most powerful individual levers for combatting global warming."}
              </p>
            </div>
            <button onClick={() => setActiveTab('actions')} className="btn-insight-emerald">
              Try a diet action <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

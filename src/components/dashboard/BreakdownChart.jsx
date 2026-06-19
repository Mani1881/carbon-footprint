import { memo } from 'react';
import PropTypes from 'prop-types';
import { Globe } from 'lucide-react';

const BreakdownChart = memo(function BreakdownChart({ total, emissions, derivedMetrics }) {
  const { transport, energy, diet, waste } = emissions;
  const {
    radius, strokeWidth, circumference,
    tDash, eDash, dDash, wDash,
    tOffset, eOffset, dOffset, wOffset,
    transportPct, energyPct, dietPct, wastePct,
  } = derivedMetrics;

  return (
    <section aria-label="Footprint category breakdown" className="glass-panel p-6 lg:col-span-7 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <Globe size={18} className="text-emerald-400" aria-hidden="true" />
          Footprint Category Breakdown
        </h3>
        <p className="text-xs text-gray-400 mb-6">Understand which parts of your lifestyle contribute the most emissions</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* SVG Donut */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120" role="img" aria-label={`Donut chart: Transport ${transportPct}%, Energy ${energyPct}%, Diet ${dietPct}%, Waste ${wastePct}%`}>
            <title>Carbon Footprint Breakdown by Category</title>
            <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} fill="none" />
            
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
          <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
            <span className="text-3xl font-extrabold">{total.toFixed(1)}t</span>
            <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Tons/Year</span>
          </div>
        </div>

        {/* Legend & Details */}
        <div className="flex flex-col gap-4 w-full sm:w-auto min-w-[200px]" role="list" aria-label="Emission categories">
          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5" role="listitem">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400" aria-hidden="true"></div>
              <span className="text-sm font-semibold">Transportation</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">{(transport/1000).toFixed(1)}t</span>
              <span className="text-[10px] text-gray-400 ml-1.5">({transportPct}%)</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5" role="listitem">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true"></div>
              <span className="text-sm font-semibold">Home Energy</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">{(energy/1000).toFixed(1)}t</span>
              <span className="text-[10px] text-gray-400 ml-1.5">({energyPct}%)</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5" role="listitem">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" aria-hidden="true"></div>
              <span className="text-sm font-semibold">Diet & Consumption</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">{(diet/1000).toFixed(1)}t</span>
              <span className="text-[10px] text-gray-400 ml-1.5">({dietPct}%)</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white/5 border border-white/5" role="listitem">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" aria-hidden="true"></div>
              <span className="text-sm font-semibold">Waste & Recycling</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">{(waste/1000).toFixed(1)}t</span>
              <span className="text-[10px] text-gray-400 ml-1.5">({wastePct}%)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BreakdownChart.propTypes = {
  total: PropTypes.number.isRequired,
  emissions: PropTypes.shape({
    transport: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    diet: PropTypes.number.isRequired,
    waste: PropTypes.number.isRequired,
  }).isRequired,
  derivedMetrics: PropTypes.shape({
    radius: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    circumference: PropTypes.number.isRequired,
    tDash: PropTypes.number.isRequired,
    eDash: PropTypes.number.isRequired,
    dDash: PropTypes.number.isRequired,
    wDash: PropTypes.number.isRequired,
    tOffset: PropTypes.number.isRequired,
    eOffset: PropTypes.number.isRequired,
    dOffset: PropTypes.number.isRequired,
    wOffset: PropTypes.number.isRequired,
    transportPct: PropTypes.number.isRequired,
    energyPct: PropTypes.number.isRequired,
    dietPct: PropTypes.number.isRequired,
    wastePct: PropTypes.number.isRequired,
  }).isRequired,
};

export default BreakdownChart;

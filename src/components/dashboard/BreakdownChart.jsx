import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Globe } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

const CHART_COLORS = {
  transport: '#22d3ee', // cyan-400
  energy: '#eab308',    // yellow-500
  diet: '#10b981',      // emerald-500
  waste: '#a855f7',     // purple-500
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#fff" className="text-xl font-bold font-display">
        {(value / 1000).toFixed(1)}t
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#9ca3af" className="text-[10px] uppercase font-bold tracking-widest">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl">
        <p className="text-sm font-bold text-white mb-1">{data.name}</p>
        <p className="text-xs text-gray-300">
          <span className="font-semibold text-emerald-400">{(data.value / 1000).toFixed(2)} tons</span> CO2e
        </p>
      </div>
    );
  }
  return null;
};

const BreakdownChart = memo(function BreakdownChart({ emissions, derivedMetrics }) {
  const { transportPct, energyPct, dietPct, wastePct } = derivedMetrics;
  
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: 'Transport', value: emissions.transport, fill: CHART_COLORS.transport, pct: transportPct },
    { name: 'Energy', value: emissions.energy, fill: CHART_COLORS.energy, pct: energyPct },
    { name: 'Diet', value: emissions.diet, fill: CHART_COLORS.diet, pct: dietPct },
    { name: 'Waste', value: emissions.waste, fill: CHART_COLORS.waste, pct: wastePct },
  ].filter(item => item.value > 0); // Don't show zero-value items

  return (
    <section aria-label="Footprint category breakdown" className="glass-panel p-6 lg:col-span-7 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <Globe size={18} className="text-emerald-400" aria-hidden="true" />
          Interactive Footprint Breakdown
        </h3>
        <p className="text-xs text-gray-400 mb-6">Hover over the chart to see detailed category emissions</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 h-full">
        {/* Recharts Donut */}
        <div className="w-full h-64 sm:w-1/2 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                onMouseEnter={onPieEnter}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Details */}
        <div className="flex flex-col gap-3 w-full sm:w-1/2 min-w-[200px]" role="list" aria-label="Emission categories">
          {data.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between gap-4 p-2.5 rounded-xl border border-white/5 transition-all cursor-pointer hover:bg-white/5"
              style={{ backgroundColor: activeIndex === i ? 'rgba(255,255,255,0.05)' : 'transparent' }}
              onMouseEnter={() => setActiveIndex(i)}
              role="listitem"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} aria-hidden="true"></div>
                <span className="text-sm font-semibold text-gray-200">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-white">{(item.value/1000).toFixed(1)}t</span>
                <span className="text-[10px] text-gray-400 ml-1.5">({item.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

BreakdownChart.propTypes = {
  emissions: PropTypes.shape({
    transport: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    diet: PropTypes.number.isRequired,
    waste: PropTypes.number.isRequired,
  }).isRequired,
  derivedMetrics: PropTypes.shape({
    transportPct: PropTypes.number.isRequired,
    energyPct: PropTypes.number.isRequired,
    dietPct: PropTypes.number.isRequired,
    wastePct: PropTypes.number.isRequired,
  }).isRequired,
};

export default BreakdownChart;

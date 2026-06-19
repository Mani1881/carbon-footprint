import { memo } from 'react';
import PropTypes from 'prop-types';
import { TrendingDown } from 'lucide-react';

const ComparisonsChart = memo(function ComparisonsChart({ comparisons }) {
  return (
    <section aria-label="Global carbon footprint comparisons" className="glass-panel p-6 lg:col-span-5 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <TrendingDown size={18} className="text-cyan-400" aria-hidden="true" />
          Global Comparisons
        </h3>
        <p className="text-xs text-gray-400 mb-6">How your annual footprint stacks up against the world (Tons CO2e)</p>
      </div>

      <div className="flex flex-col gap-5 py-2" role="list" aria-label="Carbon footprint comparisons">
        {comparisons.items.map((c, i) => {
          const widthPct = Math.max(12, (c.value / comparisons.maxVal) * 100);
          return (
            <div key={i} className="flex flex-col gap-1.5" role="listitem">
              <div className="flex justify-between text-xs font-semibold">
                <span className={c.isUser ? "text-emerald-400 font-bold flex items-center gap-1" : "text-gray-300"}>
                  {c.name} {c.isUser && '👤'}
                </span>
                <span className="font-bold">{c.value.toFixed(1)} t</span>
              </div>
              <div className="h-7 w-full bg-white/5 rounded-lg overflow-hidden border border-white/5 relative flex items-center" role="progressbar" aria-valuenow={c.value} aria-valuemin={0} aria-valuemax={comparisons.maxVal} aria-label={`${c.name}: ${c.value.toFixed(1)} tons`}>
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
    </section>
  );
});

ComparisonsChart.propTypes = {
  comparisons: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      isUser: PropTypes.bool,
    })).isRequired,
    maxVal: PropTypes.number.isRequired,
  }).isRequired,
};

export default ComparisonsChart;

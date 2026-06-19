
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCards from './StatCards';

describe('StatCards Component', () => {
  it('renders correctly with given props', () => {
    const derivedMetrics = {
      treesEquiv: 4.5,
      milesSaved: 120
    };

    render(<StatCards actionSavings={10.5} derivedMetrics={derivedMetrics} />);

    // Should display the action savings properly formatted
    expect(screen.getByText('10.5 kg')).toBeDefined();
    
    // Should display trees equivalent
    expect(screen.getByText('4.5 Trees')).toBeDefined();
    
    // Should display miles saved
    expect(screen.getByText('120 km')).toBeDefined();

    // Should display active eco streak
    expect(screen.getByText('🔥 Active')).toBeDefined();
  });

  it('displays idle eco streak when savings are 0', () => {
    const derivedMetrics = { treesEquiv: 0, milesSaved: 0 };
    render(<StatCards actionSavings={0} derivedMetrics={derivedMetrics} />);
    
    expect(screen.getByText('⏱️ Idle')).toBeDefined();
  });
});

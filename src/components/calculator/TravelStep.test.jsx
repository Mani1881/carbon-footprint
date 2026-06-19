
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TravelStep from './TravelStep';

describe('TravelStep Component', () => {
  const mockHandleTransportChange = vi.fn();
  
  const defaultProps = {
    transportData: {
      carType: 'average',
      carKms: 12000,
      flightsShort: 2,
      flightsLong: 1,
      publicTransportHours: 5,
    },
    handleTransportChange: mockHandleTransportChange
  };

  it('renders all transport inputs', () => {
    render(<TravelStep {...defaultProps} />);
    
    // Check for vehicle options
    expect(screen.getByRole('radio', { name: /Electric/i })).toBeDefined();
    
    // Check for sliders
    expect(screen.getByLabelText(/Annual driving mileage/i)).toBeDefined();
    expect(screen.getByLabelText(/Weekly public transit hours/i)).toBeDefined();
    expect(screen.getByLabelText(/Number of short flights/i)).toBeDefined();
    expect(screen.getByLabelText(/Number of long flights/i)).toBeDefined();
  });

  it('calls handleTransportChange when a new vehicle is selected', () => {
    render(<TravelStep {...defaultProps} />);
    
    const evButton = screen.getByRole('radio', { name: /Electric/i });
    fireEvent.click(evButton);
    
    expect(mockHandleTransportChange).toHaveBeenCalledWith('carType', 'electric');
  });

  it('calls handleTransportChange when slider value changes', () => {
    render(<TravelStep {...defaultProps} />);
    
    const slider = screen.getByLabelText(/Annual driving mileage/i);
    fireEvent.change(slider, { target: { value: '15000' } });
    
    expect(mockHandleTransportChange).toHaveBeenCalledWith('carKms', 15000);
  });
});

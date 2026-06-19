import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionTracker from './ActionTracker';

describe('ActionTracker Component', () => {
  const mockOnLog = vi.fn();
  const mockOnReset = vi.fn();
  
  const mockActionDefinitions = [
    { id: 'meatless_day', name: 'Meatless Day', category: 'diet', saving: 5, unit: 'day' },
    { id: 'bike_to_work', name: 'Bike to Work', category: 'transport', saving: 3, unit: 'trip' },
  ];

  const defaultProps = {
    actionDefinitions: mockActionDefinitions,
    loggedActions: { 'meatless_day': 1 },
    onLog: mockOnLog,
    onReset: mockOnReset,
    actionSavings: 5,
    setActiveTab: vi.fn(),
  };

  it('renders actions correctly', () => {
    render(<ActionTracker {...defaultProps} />);
    
    // Both actions should be displayed
    expect(screen.getByText('Meatless Day')).toBeDefined();
    expect(screen.getByText('Bike to Work')).toBeDefined();
    
    // The savings should be displayed in the header
    expect(screen.getByText('5.0 kg')).toBeDefined();
  });

  it('calls onLog when logging a new action', () => {
    render(<ActionTracker {...defaultProps} />);
    
    // Each action item has + and - buttons.
    // The + button is the second button inside the action row's control group.
    // Let's use getByText('+') since there are two actions, getByText('+')[1] is for Bike to Work.
    const logButtons = screen.getAllByText('+');
    fireEvent.click(logButtons[1]);
    
    expect(mockOnLog).toHaveBeenCalledWith('bike_to_work', 1);
  });
});

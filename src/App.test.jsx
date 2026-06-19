import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders EcoTrace header', () => {
    render(<App />);
    const headerElements = screen.getAllByText(/EcoTrace/i);
    expect(headerElements[0]).toBeInTheDocument();
  });
});

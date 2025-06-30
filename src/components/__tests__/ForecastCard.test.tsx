import { render, screen } from '@testing-library/react';
import ForecastCard from '../ForecastCard';
import type { ForecastPeriod } from '../../types';

describe('ForecastCard Component', () => {
  const mockForecast: ForecastPeriod = {
    number: 1,
    name: 'Tonight',
    startTime: '2025-06-29T20:00:00-04:00',
    endTime: '2025-06-30T06:00:00-04:00',
    isDaytime: false,
    temperature: 65,
    temperatureUnit: 'F',
    temperatureTrend: 'falling',
    windSpeed: '5 to 10 mph',
    windDirection: 'NE',
    icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
    shortForecast: 'Mostly Clear',
    detailedForecast: 'Mostly clear, with a low around 65. Northeast wind 5 to 10 mph.'
  };
  
  test('renders forecast information correctly', () => {
    render(<ForecastCard forecast={mockForecast} />);
    
    // Check for basic forecast information
    expect(screen.getByText('Tonight')).toBeInTheDocument();
    expect(screen.getByText(/65°F/)).toBeInTheDocument();
    expect(screen.getByText('Mostly Clear')).toBeInTheDocument();
    
    // Check for detailed information
    expect(screen.getByText(/Wind:/)).toBeInTheDocument();
    // Use a query mais específica com o container para evitar duplicações
    expect(screen.getByText(/Wind:/).closest('p')).toHaveTextContent(/5 to 10 mph/);
    expect(screen.getByText(/Wind:/).closest('p')).toHaveTextContent(/NE/);
    
    // Check for trend
    expect(screen.getByText('falling')).toBeInTheDocument();
    
    // Check for image
    const img = screen.getByAltText('Mostly Clear');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockForecast.icon);
  });
  
  test('formats date correctly', () => {
    render(<ForecastCard forecast={mockForecast} />);
    
    // The date should be formatted as "Sat, Jun 29" or similar
    // Testing for parts of the date since exact format may vary
    expect(screen.getByText(/Jun 29/)).toBeInTheDocument();
  });
});

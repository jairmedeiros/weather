import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { geocodeAddress, getWeatherForecast } from './services';

// Mock the API services
jest.mock('./services');

describe('App Component', () => {
  const mockGeocodeAddress = geocodeAddress as jest.MockedFunction<typeof geocodeAddress>;
  const mockGetWeatherForecast = getWeatherForecast as jest.MockedFunction<typeof getWeatherForecast>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders the application header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Weather Forecast App/i);
    expect(headerElement).toBeInTheDocument();
  });
  
  test('renders address form', () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Address/i);
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
  
  test('shows loading spinner when form is submitted', async () => {
    // Setup the mocks to not resolve immediately
    mockGeocodeAddress.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(undefined), 100)));
    
    render(<App />);
    
    // Enter an address and submit the form
    const inputElement = screen.getByLabelText(/Address/i);
    fireEvent.change(inputElement, { target: { value: '1600 Pennsylvania Ave' } });
    
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    fireEvent.click(buttonElement);
    
    // Check for loading spinner
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  
  test('displays error message when geocoding fails', async () => {
    // Mock geocoding to return null (no address match)
    mockGeocodeAddress.mockResolvedValue(undefined);
    
    render(<App />);
    
    // Enter an address and submit the form
    const inputElement = screen.getByLabelText(/Address/i);
    fireEvent.change(inputElement, { target: { value: 'Invalid Address' } });
    
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    fireEvent.click(buttonElement);
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Could not find that address/i)).toBeInTheDocument();
    });
  });
  
  test('displays forecast when API calls succeed', async () => {
    // Mock successful API responses
    mockGeocodeAddress.mockResolvedValue({
      lat: 38.8977,
      lon: -77.0365,
      formattedAddress: '1600 Pennsylvania Ave, Washington, DC 20500'
    });
    
    mockGetWeatherForecast.mockResolvedValue({
      properties: {
        periods: [
          {
            number: 1,
            name: 'Today',
            startTime: '2025-06-29T08:00:00-04:00',
            endTime: '2025-06-29T18:00:00-04:00',
            isDaytime: true,
            temperature: 85,
            temperatureUnit: 'F',
            temperatureTrend: null,
            windSpeed: '5 mph',
            windDirection: 'SW',
            icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
            shortForecast: 'Partly Sunny',
            detailedForecast: 'Partly sunny, with a high near 85.'
          }
        ],
        elevation: {
          value: 10,
          unitCode: 'wmoUnit:m'
        }
      }
    });
    
    render(<App />);
    
    // Enter an address and submit the form
    const inputElement = screen.getByLabelText(/Address/i);
    fireEvent.change(inputElement, { target: { value: '1600 Pennsylvania Ave' } });
    
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    fireEvent.click(buttonElement);
    
    // Wait for the forecast to be displayed
    await waitFor(() => {
      expect(screen.getByText(/7-Day Weather Forecast/i)).toBeInTheDocument();
      expect(screen.getByText(/Today/i)).toBeInTheDocument();
      expect(screen.getByText(/85°F/i)).toBeInTheDocument();
    });
  });
});

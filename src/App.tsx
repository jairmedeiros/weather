import { useState } from "react";
import AddressForm from "./components/AddressForm";
import type { ForecastPeriod } from "./types";
import { geocodeAddress } from "./services/geocode";
import ForecastList from "./components/ForecastList";
import { getWeatherForecast } from "./services/weather";

const App = () => {
  const [forecasts, setForecasts] = useState<ForecastPeriod[]>([]);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressSubmit = async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const geocodeResult = await geocodeAddress(address);
      
      if (!geocodeResult) {
        setError('Could not find that address. Please try a different one.');
        setLoading(false);
        return;
      }
      
      setLocation(geocodeResult.formattedAddress);
      
      const forecastData = await getWeatherForecast(
        geocodeResult.lat,
        geocodeResult.lon
      );

      if (!forecastData) {
        setError('Could not retrieve the weather forecast for that location.');
        setLoading(false);
        return;
      }
      
      setForecasts(forecastData.properties.periods);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching forecast:', err);
      setError('There was an error fetching the weather forecast. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white p-4 text-center shadow-sm">
        <h1 className="m-0 fw-bold">Weather Forecast App</h1>
      </header>

      <main className="flex-grow-1 p-4 d-flex flex-column gap-4">
        <AddressForm onAddressSubmit={handleAddressSubmit} />

        {loading && <div className="alert alert-primary mx-auto">Loading...</div>}

        {error && (
          <div className="alert alert-danger mx-auto">
            {error}
          </div>
        )}

        {!loading && !error && !forecasts?.length && (
          <div className="alert alert-danger mx-auto">
            No forecast data available for this location
          </div>
        )}

        {!loading && !error && forecasts.length > 0 && (
          <ForecastList forecasts={forecasts} location={location} />
        )}
      </main>

      <footer className="bg-dark text-white p-4 text-center mt-5">
        <p className="mb-1 small">Weather data provided by the U.S. National Weather Service</p>
        <p className="mb-0 small">Geocoding provided by the U.S. Census Bureau</p>
      </footer>
    </div>
  );
}

export default App;

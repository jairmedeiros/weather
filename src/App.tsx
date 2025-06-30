import { useState } from "react";
import AddressForm from "./components/AddressForm";
import type { ForecastPeriod } from "./types";
import { geocodeAddress, getWeatherForecast } from "./services/geocode";

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

        {!loading && !error && forecasts.length > 0 && (
          <div className="container-fluid">
            <div className="text-center mb-4">
              <h2 className="h3 mb-2">7-Day Weather Forecast</h2>
              <p className="text-muted">Location: {location}</p>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {forecasts.map((forecast) => (
                <div className="col" key={forecast.number}>
                  {forecast.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

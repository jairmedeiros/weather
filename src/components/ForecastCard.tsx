import type { ForecastPeriod } from '../types';

interface ForecastCardProps {
  forecast: ForecastPeriod;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`card h-100 shadow-sm ${forecast.isDaytime ? 'bg-light' : 'bg-dark text-white'}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="h5 mb-0">{forecast.name}</h3>
        <span className="text-muted small">{formatDate(forecast.startTime)}</span>
      </div>
      
      <div className="text-center p-3">
        <img src={forecast.icon} alt={forecast.shortForecast} className="img-fluid" style={{ maxWidth: "100px" }} />
      </div>
      
      <div className="text-center">
        <span className="display-5 fw-bold">{forecast.temperature}°{forecast.temperatureUnit}</span>
        {forecast.temperatureTrend && (
          <span className="d-block fst-italic small">{forecast.temperatureTrend}</span>
        )}
      </div>
      
      <div className="card-body">
        <p className="h6 mb-2">{forecast.shortForecast}</p>
        <p className="small mb-2">
          <strong>Wind:</strong> {forecast.windSpeed} {forecast.windDirection}
        </p>
        <p className="card-text small">{forecast.detailedForecast}</p>
      </div>
    </div>
  );
};

export default ForecastCard;

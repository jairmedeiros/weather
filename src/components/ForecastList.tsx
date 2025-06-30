import type { ForecastPeriod } from '../types';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecasts: ForecastPeriod[];
  location: string;
}

const ForecastList = ({ forecasts, location }: ForecastListProps) => {
  return (
    <div className="container-fluid">
      <div className="text-center mb-4">
        <h2 className="h3 mb-2">7-Day Weather Forecast</h2>
        <p className="text-muted">Location: {location}</p>
      </div>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {forecasts.map((forecast) => (
          <div className="col" key={forecast.number}>
            <ForecastCard forecast={forecast} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;

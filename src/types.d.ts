export interface GeocodingResult {
  result: {
    addressMatches: AddressMatch[];
  };
}

export interface AddressMatch {
  coordinates: {
    x: number; // longitude
    y: number; // latitude
  };
  addressComponents: {
    city: string;
    state: string;
    zip: string;
  };
  matchedAddress: string;
}

// Weather API types
export interface WeatherForecast {
  properties: {
    periods: ForecastPeriod[];
    elevation: {
      value: number;
      unitCode: string;
    };
  };
}

export interface ForecastPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string | null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

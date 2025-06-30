import type { WeatherForecast } from '../types';

const PROXY_BASE_URL = 'http://localhost:3001';

export const getWeatherForecast = async (lat: number, lon: number): Promise<WeatherForecast | undefined> => {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/forecast?lat=${lat}&lon=${lon}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data as WeatherForecast | undefined;
  } catch (error) {
    console.error('Error getting weather forecast:', error);
    throw error;
  }
};
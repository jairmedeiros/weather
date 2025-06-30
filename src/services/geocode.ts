import type { GeocodingResult, WeatherForecast } from '../types';

const PROXY_BASE_URL = 'http://localhost:3001';

interface GeocodingAddress { 
    lat: number; 
    lon: number; 
    formattedAddress: string 
}

export const geocodeAddress = async (address: string): Promise<GeocodingAddress | undefined> => {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/geocode?address=${encodeURIComponent(address)}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json() as Partial<GeocodingResult> | undefined;
    
    if (!data?.result?.addressMatches?.length) {
      return undefined;
    }
    
    const match = data.result.addressMatches[0];
    
    return {
      lat: match.coordinates.y,
      lon: match.coordinates.x,
      formattedAddress: match.matchedAddress
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

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

import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();
app.use(cors());

app.get('/geocode', async (req: Request, res: Response) => {
  const address = req.query.address as string;

  if (!address) {
    return res.status(400).json({ error: 'Address not provided' });
  }

  try {
    const response = await fetch(`https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=4&format=json`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error geocoding address:', error);
    res.status(500).json({ error: 'Error processing geocoding request' });
  }
});

app.get('/forecast', async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  let forecastUrl = null;

  try {
    const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();

    if (!data) {
        throw new Error('No data returned from weather API');
    }

    forecastUrl = data.properties.forecast;
  } catch (error) {
    console.error('Error getting weather points:', error);
    return res.status(500).json({ error: 'Error processing weather points request' });
  }

  if (!forecastUrl) {
    return res.status(400).json({ error: 'Latitude and longitude do not correspond to a valid forecast' });
  }

  try {
    const response = await fetch(forecastUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error getting weather forecast:', error);
    res.status(500).json({ error: 'Error processing weather forecast request' });
  }
});

app.listen(3001, () => {
  console.log(`Proxy server running on 3001`);
});

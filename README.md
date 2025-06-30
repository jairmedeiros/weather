# Weather Forecast Application

A React TypeScript application that allows users to get a 7-day weather forecast for any U.S. address. The application uses the U.S. Census Bureau's Geocoding API to convert addresses into geographic coordinates and the National Weather Service API to fetch weather forecasts.

## Project Structure

```
src/
├── components/     # React components
├── services/       # API service functions
└── server/         # Express proxy server
```

## APIs Used

- [U.S. Census Geocoding Services](https://geocoding.geo.census.gov/geocoder/)
- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)

## Tech Stack

- React
- TypeScript
- Bootstrap for UI components
- Node.js/Express (for local proxy server)
- Fetch API for HTTP requests

## Available Scripts

In the project directory, you can run:

### `npm run server`

Starts the local proxy server on port 3001.
This server is necessary to avoid CORS issues when accessing external APIs.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

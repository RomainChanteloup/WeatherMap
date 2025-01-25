export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    location_id: number; // pas definit pour le premier element
    elevation: number;
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
    };
    current: {
      time: string;
      interval: number;
      temperature_2m: number;
    };
  }
// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getWeatherData(coordinatesList: Coordinates[]): Observable<WeatherData[]> {
    const latitudeList = coordinatesList.map((coordinates) => coordinates.latitude).join(',');
    const longitudeList = coordinatesList.map((coordinates) => coordinates.longitude).join(',');

    const params = {
      latitude: latitudeList,
      longitude: longitudeList,
      current: 'temperature_2m',
      forecast_days: 1
    };

    return this.http.get<WeatherData[]>(this.apiUrl, { params }).pipe(
      map((response) => {
        response[0].location_id = 0; // on set par default sinon undefined
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return [];
      })
    );
  }

}
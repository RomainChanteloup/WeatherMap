// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Coordinates, WeatherData } from '../model/weather.model';

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
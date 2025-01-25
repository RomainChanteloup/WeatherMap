import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HighchartsChartModule } from "highcharts-angular";
import * as Highcharts from "highcharts/highmaps";
import franceMap from "@highcharts/map-collection/countries/fr/custom/fr-all-all-mainland.topo.json";

import HC_map from "highcharts/modules/map";
import { WeatherData, WeatherService } from "../service/weather.service";
HC_map(Highcharts);

@Component({
  selector: "app-map",
  standalone: true,
  styleUrls: ["./map.component.scss"],
  imports: [CommonModule, HighchartsChartModule],
  template: `
  <div class="chart-container">
  <highcharts-chart
      [Highcharts]="Highcharts"
      [constructorType]="'mapChart'"
      [options]="chartOptions"
      [callbackFunction]="onChartCallback"
      style="width: 100%; height: 100%; max-width: 600px;"
    ></highcharts-chart>
  </div>
    
    <div class="weather-table">
  <table>
    <thead>
      <tr>
        <th>City</th>
        <th>Temperature (°C)</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let weatherData of weatherDataList">
        <td>{{ this.coordinatesList[weatherData.location_id].name }}</td>
        <td>{{ weatherData.current.temperature_2m }}</td>
      </tr>
    </tbody>
  </table>
</div>
  `,
})
export class MapComponent implements OnInit {
  weatherDataList: WeatherData[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions: Highcharts.Options;
  chart: Highcharts.Chart | null = null;

  constructor(private weatherService: WeatherService) {
    this.chartOptions = {
      chart: {
        map: franceMap,
      },
      title: {
        text: undefined,
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox",
        },
      },
      series: [
        {
          type: "map",
          name: "France",
          states: {
            hover: {
              color: "#BADA55",
            },
          },
          allAreas: true,
          data: [],
        } as Highcharts.SeriesMapOptions,
      ],
      tooltip: {
        shared: false,
        formatter: function (this: any) {
          if (this.series.userOptions.type === "mappoint") {
            return this.point.text;
          } else {
            return null; // or return an empty string
          }
        },
      },
      legend: {
        enabled: false
      },
    };
  }

  coordinatesList = [
    { name: "Paris", latitude: 48.8534, longitude: 2.3488 },
    { name: "Lyon", latitude: 45.750000, longitude: 4.850000 },
    { name: "Marseille", latitude: 43.297, longitude: 5.3811 },
  ];

  onChartCallback = (chart: Highcharts.Chart) => {
    this.chart = chart;
    this.addData();
  };

  ngOnInit() {
  }

  addData () {
    this.weatherService
      .getWeatherData(this.coordinatesList)
      .subscribe((weatherDataList) => {
        this.weatherDataList = weatherDataList;
        const weatherData = weatherDataList.map((weatherData) => ({
          name: this.coordinatesList[weatherData.location_id].name,
          lat: weatherData.latitude,
          lon: weatherData.longitude,
          text: `Temperature: ${weatherData.current.temperature_2m}°C`,
        }));
          console.log("Adding series to chart");
          this.chart?.addSeries({
            type: "mappoint",
            name: "Cities",
            marker: {
              radius: 5,
              fillColor: "tomato",
            },
            data: weatherData,
          } as Highcharts.SeriesMappointOptions, true);
      });
  }
}
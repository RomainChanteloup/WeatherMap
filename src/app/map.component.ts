import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highmaps';
import franceMap from '@highcharts/map-collection/countries/fr/custom/fr-all-all-mainland.topo.json';

// Initialize map module
import HC_map from 'highcharts/modules/map';
HC_map(Highcharts);

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [constructorType]="'mapChart'"
      [options]="chartOptions"
      style="width: 100%; height: 600px; display: block;"
    ></highcharts-chart>
  `,
})
export class MapComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  chartOptions: Highcharts.Options = {
    chart: {
      map: franceMap,
    },
    title: {
      text: undefined,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox',
      },
    },
    series: [
      {
        type: 'map',
        name: 'France',
        states: {
          hover: {
            color: '#BADA55',
          },
        },
        allAreas: true,
        data: [],
      } as Highcharts.SeriesMapOptions,
      {
        type: 'mappoint',
        name: 'Cities',
        marker: {
          radius: 5,
          fillColor: 'tomato',
        },
        data: [
          {
            name: 'Paris',
            lat: 48.8566,
            lon: 2.3522,
          },
        ],
      },
    ],
  };

  ngOnInit() {
    // No additional initialization needed as we defined chartOptions directly
  }
}

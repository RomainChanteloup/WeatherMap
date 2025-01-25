import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MapComponent } from './app/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent],
  template: `
    <h1>Weather Map of France</h1>
    <app-map></app-map>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});
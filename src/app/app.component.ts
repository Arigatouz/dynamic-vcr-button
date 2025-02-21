import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicButton } from './dynamic-button/dynamic-button.component';
import { DynamicVariantButton } from './dynamic-variant-button/dynamic-variant-button.component';

@Component({
  selector: 'app-root',
  imports: [DynamicButton, DynamicVariantButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dynamic-button-vcr';
}

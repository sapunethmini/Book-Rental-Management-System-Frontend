import { Component } from '@angular/core';
import { RouterOutlet ,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {}
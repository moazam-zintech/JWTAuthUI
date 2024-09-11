import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule,NgToastService } from 'ng-angular-popup';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, RouterLink,FormsModule,ReactiveFormsModule,NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JWTAuth';
}
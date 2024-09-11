import { provideRouter, RouterModule, Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './components/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './components/register/register.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './Gaurd/auth.guard';
import { HomeComponent } from './components/home/home.component';

         
export const routes: Routes = [{path: '',redirectTo:'Login', pathMatch: 'full'},
    {path: 'Home',component: HomeComponent},
    {path: 'Login',component: LoginComponent},
    {path: 'Register',component: RegisterComponent},
    {path: 'Logout',component: HomeComponent},
    {path: 'Dashboard',component: DashboardComponent}
];
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ResetComponent } from './components/reset/reset.component';

         
export const routes: Routes = [{path: '',redirectTo:'Login', pathMatch: 'full'},
    {path: 'Home',component: HomeComponent},
    {path: 'Login',component: LoginComponent},
    {path: 'Register',component: RegisterComponent},
    {path: 'Logout',component: HomeComponent},
    {path: 'Dashboard',component: DashboardComponent},
    {path: 'Reset',component: ResetComponent}
];
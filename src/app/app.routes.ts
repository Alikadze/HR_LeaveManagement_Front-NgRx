import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.routes').then(m => m.AuthRoutes)
  },
  { 
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

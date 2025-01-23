import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import {authGuard} from './core/guards/auth.guard'

export const routes: Routes = [
  {path:'login',
    loadComponent:()=>import('./features/login/login.component').then((m)=> m.LoginComponent)
  },
  {path:'signup',
    loadComponent:()=>import('./features/signup/signup.component').then((m)=> m.SignupComponent)
  },
  {path:'printee-landing',
    loadComponent:()=> import('./features/printee-landing/printee-landing.component').then((m)=>m.PrinteeLandingComponent),
    canActivate:[authGuard]
  },
  {
    path: '',
    redirectTo: 'login', // Redirect to login on base route
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent }
];

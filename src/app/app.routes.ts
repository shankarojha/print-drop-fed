import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:"signup",
        //component:SignupComponent
        loadComponent:()=> import("./signup/signup.component").then((c)=>c.SignupComponent)
    },
    {
        path:"dashboard",
       // component:DashboardComponent
       //lazy loading
       loadComponent:()=> import("./dashboard/dashboard.component").then((c)=>c.DashboardComponent)
    }
];

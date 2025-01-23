import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

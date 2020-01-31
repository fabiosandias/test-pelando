import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full',},
    { path: 'home', component: HomeComponent, data: { animation: '' }},
    { path: 'search', component: ModalComponent}

];

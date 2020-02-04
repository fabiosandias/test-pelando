import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';

export const ROUTES: Routes = [

    {
        path: '',
        component: HomeComponent,
        data: { animation: '' },
        children: [
            { path: 'search', component: ModalComponent}
        ]
    },
];

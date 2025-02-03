import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shipment-summary', loadComponent: () => import('./pages/shipment-summary/shipment-summary.component').then(m => m.ShipmentSummaryComponent) },
    {path: 'shipment-list', loadComponent: () => import('./pages/shipment-list/shipment-list.component').then(m => m.ShipmentListComponent),
        /*
        children:[
            {path:'details', loadComponent: () => import('./components/selected-shipment-details/selected-shipment-details.component').then(m => m.SelectedShipmentDetailsComponent)},
            {path:'all-shipment', loadComponent: () => import('./components/all-shipment-list/all-shipment-list.component').then(m => m.AllShipmentListComponent)},
            { path: '', redirectTo: 'all-shipment', pathMatch: 'full'},
        ]
        */
    
    },

];

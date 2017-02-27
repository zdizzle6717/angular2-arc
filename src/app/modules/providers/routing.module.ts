import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../library/modules/auth';

// Component Views
import { ProviderSearchComponent } from './components/views/providerSearch.component';
import { ProviderViewComponent } from './components/views/providerView.component';
import { ProviderEditComponent } from './components/views/providerEdit.component';

// Route Config
const appRoutes: Routes = [
    {
        'path': 'providers',
        'component': ProviderSearchComponent,
        'data': { 'title': 'Angular2 | Search Providers' }
    },
    {
        'path': 'providers/create',
        'component': ProviderEditComponent,
				'canActivate': [AuthGuard],
        'data': { 'title': 'Angular2 | Create Provider', accessLevel: ['providerAdmin'] }
    },
    {
        'path': 'providers/:id',
        'component': ProviderViewComponent,
        'data': { 'title': 'Angular2 | View Providers' }
    },
    {
        'path': 'providers/:id/edit',
        'component': ProviderEditComponent,
				'canActivate': [AuthGuard],
        'data': { 'title': 'Angular2 | Edit Providers', accessLevel: ['providerAdmin'] }
    }
];

@NgModule({
    'imports': [RouterModule.forChild(appRoutes)],
    'exports': [RouterModule]
})
export class RoutingModule { }

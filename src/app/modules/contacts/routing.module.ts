import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Views
import { ContactSearchComponent } from './components/views/contactSearch.component';
import { ContactViewComponent } from './components/views/contactView.component';
import { ContactEditComponent } from './components/views/contactEdit.component';

// Route Config
const appRoutes: Routes = [
    {
        'path': 'contacts',
        'component': ContactSearchComponent,
        'data': { 'title': 'Angular2 | Search Contacts' }
    },
    {
        'path': 'contacts/create',
        'component': ContactEditComponent,
        'data': { 'title': 'Angular2 | Create Contact' }
    },
    {
        'path': 'contacts/:id',
        'component': ContactViewComponent,
        'data': { 'title': 'Angular2 | View Contact' }
    },
    {
        'path': 'contacts/:id/edit',
        'component': ContactEditComponent,
        'data': { 'title': 'Angular2 | Edit Contact' }
    }
];

@NgModule({
    'imports': [RouterModule.forChild(appRoutes)],
    'exports': [RouterModule]
})
export class RoutingModule { }

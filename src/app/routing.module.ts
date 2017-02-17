'use strict';

// Angular Dependencies
import { NgModule }      from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Component Views
import { PageNotFoundComponent } from './main/components/views/pageNotFound.component';
import { HomeComponent } from './main/components/views/home.component';
import { LoginComponent } from './main/components/views/login.component';
import { RegisterComponent } from './main/components/views/register.component';

import { DataResolver } from './app.resolver';

// Route Config
const appRoutes: Routes = [
	{
    path: '',
    component: HomeComponent,
    data: { title: 'Angular2 | Home' }
  },
	{
    path: 'login',
    component: LoginComponent,
    data: { title: 'Angular2 | Login' }
  },
	{
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Angular2 | Register' }
  },
  {
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }) ],
	exports: [ RouterModule ]
})
export class RoutingModule { }

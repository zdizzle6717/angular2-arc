import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../library/modules/auth';

// Component Views
import { DemoListComponent } from './components/views/demoList.component';

// Route Config
const appRoutes: Routes = [
	{
		'path': 'demos',
		'component': DemoListComponent,
		'canActivate': [AuthGuard],
		'data': { title: 'Angular2 | Demos', accessLevel: ['siteAdmin'] }
	}
];

@NgModule({
  'imports': [ RouterModule.forChild(appRoutes) ],
  'exports': [ RouterModule ]
})
export class RoutingModule { }

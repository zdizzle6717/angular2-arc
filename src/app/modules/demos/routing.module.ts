import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Views
import { DemoListComponent } from './components/views/demoList.component';

// Route Config
const appRoutes: Routes = [
	{
		path: 'demos',
		component: DemoListComponent,
		data: { title: 'Angular2 | All Demos' }
	}
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }

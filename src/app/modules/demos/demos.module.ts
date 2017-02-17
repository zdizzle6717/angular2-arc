import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { RoutingModule } from './routing.module';

// Components

// Component Views
import { DemoListComponent } from './components/views/demoList.component';

// Services

@NgModule({
  imports: [ CommonModule, FormsModule, RoutingModule ],
  declarations: [ DemoListComponent ],
	providers: [ ],
  exports: [ ]
})
export class DemosModule { }

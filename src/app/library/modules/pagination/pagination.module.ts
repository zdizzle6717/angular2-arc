import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { PaginationComponent } from './components/pagination.component';

@NgModule({
  'imports': [ CommonModule ],
  'declarations': [ PaginationComponent ],
	'providers': [ ],
  'exports': [ PaginationComponent ]
})
export class PaginationModule { }

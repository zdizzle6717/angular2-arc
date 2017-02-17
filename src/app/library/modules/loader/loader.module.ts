import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoaderComponent } from './components/loader.component';

@NgModule({
    'imports': [CommonModule],
    'declarations': [LoaderComponent],
    'providers': [],
    'exports': [LoaderComponent]
})
export class LoaderModule { }

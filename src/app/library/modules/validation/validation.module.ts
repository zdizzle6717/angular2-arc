import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ValidateComponent } from './components/validate.component';

@NgModule({
    'imports': [CommonModule],
    'declarations': [ValidateComponent],
    'providers': [],
    'exports': [ValidateComponent]
})
export class ValidationModule { }

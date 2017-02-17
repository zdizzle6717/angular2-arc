import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ModalComponent } from './components/modal.component';

@NgModule({
    'imports': [CommonModule],
    'declarations': [ModalComponent],
    'providers': [],
    'exports': [ModalComponent]
})
export class ModalModule { }

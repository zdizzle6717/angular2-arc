import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AlertsComponent } from './components/alerts.component';

@NgModule({
    'imports': [CommonModule],
    'declarations': [AlertsComponent],
    'providers': [],
    'exports': [AlertsComponent]
})
export class AlertsModule { }

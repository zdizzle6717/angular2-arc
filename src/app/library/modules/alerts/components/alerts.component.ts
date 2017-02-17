import { Component, Input, OnInit, Inject, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Alert } from '../types/alert';
import { AlertService } from '../services/alert.service';

@Component({
    'selector': 'alerts',
    'providers': [],
    templateUrl: '../templates/alerts.html',
})
export class AlertsComponent implements OnInit {
    public alerts: Alert[] = [];
    public subscription: Subscription;

    constructor(
        private service: AlertService
    ) { }

    public ngOnInit() {
        this.subscription = this.service.alerts$.subscribe((alerts: any) => {
            this.alerts = alerts;
        });
    }

    public closeAlert(alert: Alert) {
        this.service.removeAlert(alert);
    }

}

'use strict';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Alert } from '../types/alert';

let _alertTimeout = 5000;

@Injectable()
export class AlertService {
		public alerts = new BehaviorSubject<Alert[]>([]);
    public alerts$ = this.alerts.asObservable();

    public addAlert(alert: Alert) {
        alert.id = Date.now();
        let _alerts = [...this.alerts.value, alert];
        this.alerts.next(_alerts);

        if (alert.delay !== -1) {
            let delay = alert.delay ? alert.delay : _alertTimeout;
            setTimeout(() => {
                this.removeAlert(alert);
            }, delay);
        }
    }

    public removeAlert(alert: Alert) {
        let _alerts = [...this.alerts.value];
        let index = _alerts.findIndex((_alert: Alert) => _alert.id === alert.id);
        if (index !== -1) {
            _alerts.splice(index, 1);
        }
        this.alerts.next(_alerts);
    }

};

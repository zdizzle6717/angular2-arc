'use strict';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoaderService {
		public active = new BehaviorSubject<boolean>(false);
    public active$ = this.active.asObservable();

    public showLoader() {
        this.active.next(true);
    }

    public hideLoader() {
        this.active.next(false);
    }

};

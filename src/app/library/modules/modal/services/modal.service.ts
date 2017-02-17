'use strict';

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ModalService {
		public activeModals = new BehaviorSubject<any>({});
		public config = new BehaviorSubject<boolean>(false);
    public activeModals$ = this.activeModals.asObservable();
    public config$ = this.config.asObservable();

    constructor(private http: Http) { }

    public showModal(config: any) {
        if (!config.id) {
            throw new Error('Modal config must have an id!');
        }
        this.config.next(config);
        this.activeModals.next(Object.assign(this.activeModals.value, { [config.id]: { 'active': true } }));
    }

    public hideModal(id: (string | number)) {
        this.activeModals.next(Object.assign(this.activeModals.value, { [id]: { 'active': false } }));
    }

    // This is necessary to make sure modals close on view/route change
    public hideAllModals() {
        this.activeModals.next({});
    }
};

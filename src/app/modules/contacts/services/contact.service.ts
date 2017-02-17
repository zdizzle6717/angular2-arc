'use strict';

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Contact } from '../types/contact';
import { CustomHttpService } from '../../../main/services/customHttp.service';

@Injectable()
export class ContactService {
    private baseUrl = this.apiBaseRoute;

    constructor( @Inject('EGOV_API_BASE_ROUTE') private apiBaseRoute: any, private http: CustomHttpService) { }

    public getContact(id: any): Observable<Contact> {
        return this.http.get(this.baseUrl + 'contacts/' + id).map(this.extractData).catch(this.handleError);
    }

    public getContacts(): Observable<Contact[]> {
        return this.http.get(this.baseUrl + 'contacts').map(this.extractData).catch(this.handleError);
    }

    public paginatedSearch(criteria: any): Observable<any> {
        return this.http.post(this.baseUrl + 'contacts/search', criteria).map(this.extractData).catch(this.handleError);
    }

    public addContact(contact: Contact) {
        return this.http.post(this.baseUrl + 'contacts', contact).map(this.extractData).catch(this.handleError);
    }

    public updateContact(id: string, contact: Contact) {
        return this.http.put(this.baseUrl + 'contacts/' + id, contact).map(this.extractData).catch(this.handleError);
    }

    public removeContact(id: string) {
        return this.http.delete(this.baseUrl + 'contacts/' + id).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }
};

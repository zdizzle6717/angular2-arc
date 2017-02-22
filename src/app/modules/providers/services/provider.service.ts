'use strict';

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Provider } from '../types/provider';
import { CustomHttpService } from '../../main/services/customHttp.service';

@Injectable()
export class ProviderService {
    private baseUrl = this.apiBaseRoute;

    constructor( @Inject('EGOV_API_BASE_ROUTE') private apiBaseRoute: any, private http: CustomHttpService) { }

		public getProvider(id: any): Observable<Provider> {
        return this.http.get(this.baseUrl + 'providers/' + id).map(this.extractData).catch(this.handleError);
    }

    public getProviders(): Observable<Provider[]> {
        return this.http.get(this.baseUrl + 'providers').map(this.extractData).catch(this.handleError);
    }

    public addProvider(provider: Provider) {
        return this.http.post(this.baseUrl + 'providers', provider).map(this.extractData).catch(this.handleError);
    }

    public updateProvider(id: string, provider: Provider) {
        return this.http.put(this.baseUrl + 'providers/' + id, provider).map(this.extractData).catch(this.handleError);
    }

    public removeProvider(id: string) {
        return this.http.delete(this.baseUrl + 'providers/' + id).catch(this.handleError);
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

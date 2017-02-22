import { Injectable, Inject } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoaderService } from '../../../library/modules/loader';
import { UserService } from '../../../library/modules/auth';

let timer: any;
let numLoadings = 0;
let _defaultLoaderTimeout = 350;

@Injectable()
export class CustomHttpService extends Http {
    private loaderTimeout: number = _defaultLoaderTimeout;

    constructor(backend: XHRBackend, options: RequestOptions, private router: Router, private loaderService: LoaderService, private userService: UserService) {
        super(backend, options);
        // Store token in sessionStorage for the lifespan of the browser
        let token = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')).id_token : null;
        options.headers.set('Content-Type', 'application/json; charset=utf-8');
        if (token) {
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            options.headers.set('Authorization', '');
        }
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        // Show loader when request is sent
        numLoadings++;
        if (numLoadings < 2) {
            timer = setTimeout(() => {
                this.loaderService.showLoader();
            }, this.loaderTimeout);
        }

        let token = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')).id_token : null;
        if (typeof url === 'string') {
            // meaning we have to add the token to the options, not in url
            if (!options) {
                options = { headers: new Headers() };
            }
            options.headers.set('Content-Type', 'application/json; charset=utf-8');
            if (token) {
                options.headers.set('Authorization', `Bearer ${token}`);
            }
        } else {
            // We have to add the token to the url object
            url.headers.set('Content-Type', 'application/json; charset=utf-8');
            if (token) {
                url.headers.set('Authorization', `Bearer ${token}`);
            } else {
                url.headers.set('Authorization', '');
            }
        }
        return super.request(url, options).map((response) => {
            // Hide loader when response is returned
            if (numLoadings === 0) { return; }

            if (numLoadings < 2) {
                clearTimeout(timer);
                this.loaderService.hideLoader();
            }
            numLoadings--;
            return response;
        }).catch(this.catchAuthError());
    }

    // This can be called from the root app.component on initial load to set a custom timeout for the loader
    public setTimeout(timeout: number) {
        this.loaderTimeout = timeout;
    }

    private catchAuthError = () => {
        // Hide loader if error is caught
        clearTimeout(timer);
        this.loaderService.hideLoader();
        return (res: Response) => {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated/authorized
                console.log('401 or 403', res);
                this.userService.logout();
                this.router.navigate(['/']);
            }
            return Promise.reject(res);
        };
    }
}

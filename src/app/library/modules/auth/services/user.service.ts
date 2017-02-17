'use strict';

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../types/user';

@Injectable()
export class UserService {
    public storedUser = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : new User();
    public currentUser = new BehaviorSubject<User>(this.storedUser);
    public currentUser$ = this.currentUser.asObservable();
    private baseUrl = this.apiBaseRoute;

    constructor( @Inject('EGOV_USER_ROLES') private userRoles: any, @Inject('EGOV_API_BASE_ROUTE') private apiBaseRoute: any, private http: Http) { }

    public authenticate(user: User): Observable<User> {
        let credentials = {
            'username': user.username,
            'password': user.password
        };
        return this.http.post(this.baseUrl + 'users/authenticate', credentials).map(this.extractUserData).catch(this.handleError);
    }

    public register(credentials: any): Observable<any> {
        return this.http.post(this.baseUrl + 'users', credentials).map(this.extractUserData).catch(this.handleError);
    }

    public logout() {
        this.currentUser.next(new User());
        sessionStorage.removeItem('storedUser');
    }

    private extractUserData = (res: Response) => {
        let user = res.json();
        user.isAuthenticated = true;

        if (user) {
            this.userRoles.forEach((role: any) => {
                if (role.roleFlags === user.roleFlags) {
                    user.roleConfig = role;
                }
            });
            if (!user.roleConfig) {
                throw new Error('Oops! Make sure that the rolesConfig on the UI and API have matching values.');
            }
        }

        this.currentUser.next(user);
        sessionStorage.setItem('storedUser', JSON.stringify(user));
        return user || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.message || JSON.stringify(body);
            errMsg = err;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }
};

import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './user.service';
import { User } from '../types/user';
import checkAuthorization from '../utilities/checkAuthorization';

// TODO: Added redirect and/or alerts

@Injectable()
export class AuthGuard implements CanActivate {
    private user: User = new User();
    private subscription: Subscription;

    constructor( @Inject('EGOV_USER_ROLES') private userRoles: any, private router: Router, private userService: UserService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let accessGranted = false;
        this.subscription = this.userService.currentUser$.subscribe((user: User) => {
            this.user = user;
        });
        let accessLevel = route.data ? route.data['accessLevel'] : null;
        if (accessLevel) {
            if (!this.user.isAuthenticated) {
                accessGranted = false;
                let config = {
                    'path': route.url[0].path,
                    'params': route.url[0].parameters
                };
                this.userService.setRedirect(config);
                this.router.navigate(['/login']);
                console.log('Unauthenticated');
            } else {
                accessGranted = checkAuthorization(accessLevel, this.user, this.userRoles);
                if (accessGranted) {
                    console.log('Authorized.');
                } else {
                    console.log('Unauthorized.');
                }
            }
        } else {
            accessGranted = true;
        }
        this.subscription.unsubscribe();
        return accessGranted;
    }
}

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../types/user';
import { AlertService } from '../../../library/modules/alerts';
import { UserService } from '../../../library/modules/auth';

@Component({
    selector: 'site-header',
    providers: [],
    templateUrl: '../templates/header.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
		public subscription: Subscription;
    public user: User = new User();
    public activeMobileMenu: boolean = false;

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.subscription = this.userService.currentUser$.subscribe((user: User) => {
            this.user = user;
        });
    }

    public logout() {
        this.userService.logout();
        this.alertService.addAlert({
            title: 'Logged Out',
            message: 'You were logged out successfully.',
            type: 'info',
            delay: 5000
        });
        this.router.navigate(['/']);
    }

    public toggleMenu() {
        this.activeMobileMenu = !this.activeMobileMenu;
    }

    public closeMenu() {
        this.activeMobileMenu = false;
    }

    public ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

}

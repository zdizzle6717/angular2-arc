import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../types/user';
import { AlertService } from '../../../library/modules/alerts';
import { UserService } from '../../../library/modules/auth';

@Component({
    template: `
		<div class="row">
			<h1 class="push-bottom-2x">Register</h1>
			<hr />
			<div class="small-12 medium-6 medium-offset-3 large-4 large-offset-4 columns">
					<form name="registrationForm" (ngSubmit)="register(credentials)" #registrationForm="ngForm">
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Username</label>
								<input type="text" name="username" [(ngModel)]="credentials.username"  required/>
							</div>
						</div>
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Email</label>
								<input type="text" name="email" [(ngModel)]="credentials.email" required/>
							</div>
						</div>
						<label class="required">User Role</label>
						<select name="role" [(ngModel)]="credentials.role" required>
							<option value="">--Select--</option>
							<option value="siteAdmin">Site Admin</option>
							<option value="providerAdmin">Provider Admin</option>
							<option value="contactAdmin">Contact Admin</option>
						</select>
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Password</label>
								<input type="password" name="password" [(ngModel)]="credentials.password" required/>
							</div>
						</div>
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Repeat Password</label>
								<input type="password" name="passwordRepeat" [(ngModel)]="repeatPassword"  required/>
							</div>
						</div>
						<div class="row">
							<div class="form-group small-12 columns text-right">
								<button type="submit" class="button" [disabled]="registrationForm.invalid">Register</button>
							</div>
						</div>
					</form>
					<div class="form-group small-12">
						Already have an account? <a [routerLink]="['/login']" routerLinkActive="active">Go to Login</a>
					</div>
				</div>
		</div>
	`
})
export class RegisterComponent {
    public credentials: User = {
        'isAuthenticated': false
    };
    public repeatPassword: string;

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private router: Router
    ) { }

    public register(credentials: any) {
        if (credentials.password !== this.repeatPassword) {
            this.addAlert('mismatchedPassword');
            return;
        }
        this.userService.register(credentials).subscribe((user: User) => {
            this.addAlert('registrationSuccess');
            this.router.navigate(['/']);
        }, (err: any) => {
            if (err === 'Username taken') {
                this.addAlert('invalidUsername');
            } else if (err === 'Email taken') {
                this.addAlert('invalidEmail');
            } else {
                console.log(err);
            }
        });
    }

    public addAlert(name: string) {
        let options = {
            'registrationSuccess': {
                title: 'Registration Success',
                message: 'You have successfully registered an account and were automatically logged in.',
                type: 'success',
                delay: 5000
            },
            'invalidUsername': {
                title: 'Invalid Username',
                message: 'An account with that username is already in use.',
                type: 'error',
                delay: 3000
            },
            'invalidEmail': {
                title: 'Invalid Email',
                message: 'An account with that email is already in use.',
                type: 'error',
                delay: 3000
            },
            'mismatchedPassword': {
                title: 'Mismatched Password',
                message: 'Please double check that the passwords entered are matching.',
                type: 'error',
                delay: 3000
            }
        };

        this.alertService.addAlert(options[name]);
    }
}

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../types/user';
import { AlertService } from '../../../../library/modules/alerts';
import { UserService } from '../../../../library/modules/auth';
import { ValidationService } from '../../../../library/modules/validation';

@Component({
    template: `
		<div class="row">
			<h1 class="push-bottom-2x">Login</h1>
			<hr />
			<div class="small-12 medium-6 medium-offset-3 large-4 large-offset-4 columns">
				<form [formGroup]="loginForm" (ngSubmit)="login(loginForm.value)">
					<div class="row">
						<div class="form-group small-12 columns">
							<label class="required">Username/Email</label>
							<validate [errors]="formErrors['username']">
								<input type="text" formControlName="username" required/>
							</validate>
						</div>
					</div>
					<div class="row">
						<div class="form-group small-12 columns">
							<label class="required">Password</label>
							<validate [errors]="formErrors['password']">
								<input type="password" formControlName="password" required/>
							</validate>
						</div>
					</div>
					<div class="row">
						<div class="form-group small-12 columns text-right">
							<button type="submit" class="button" [disabled]="loginForm.invalid" >Login</button>
						</div>
					</div>
				</form>
				<div class="form-group small-12">
					Don't have an account? <a [routerLink]="['/register']" routerLinkActive="active">Register/Sign Up</a>
				</div>
			</div>
		</div>
	`
})
export class LoginComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    public loginForm: FormGroup;
    public formErrors: any;
    public credentials: User = {
        'isAuthenticated': false
    };
    private redirectConfig: any;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private userService: UserService,
        private validationService: ValidationService
    ) { }

    public ngOnInit() {
        this.subscription = this.validationService.forms$.subscribe((forms) => {
            this.formErrors = forms['loginForm'];
        });
        this.buildForm();
    }

		public buildForm(): void {
        this.loginForm = this.validationService.buildForm('loginForm', {
            'username': [this.credentials.username, [Validators.required, Validators.minLength(8)]],
            'password': [this.credentials.password, [Validators.required, Validators.minLength(8), this.validationService.simpleValidator('password')]]
        });
        this.loginForm.valueChanges.subscribe((data) => this.validationService.onValueChanged('loginForm', this.loginForm, data));
    }

    public login(user: User) {
        this.userService.authenticate(user).subscribe((response: User) => {
            this.addAlert('loginSuccess');
            this.router.navigate([response['redirect'].path, response['redirect'].params]);
        }, (err: any) => {
            if (err === 'Incorrect username or email!') {
                this.addAlert('incorrectUsername');
            } else if (err === 'Incorrect password!') {
                this.addAlert('incorrectPassword');
            } else {
                console.log(err);
            }
        });
    }

    public addAlert(name: string) {
        let options = {
            'loginSuccess': {
                title: 'Successfully Logged In',
                message: 'You have successfully been authenticated.',
                type: 'success',
                delay: 3000
            },
            'incorrectPassword': {
                title: 'Incorrect Password',
                message: 'The password you entered is incorrect.',
                type: 'error',
                delay: 3000
            },
            'incorrectUsername': {
                title: 'Incorrect Email/Username',
                message: 'No user was found with that email or username.',
                type: 'error',
                delay: 3000
            }
        };

        this.alertService.addAlert(options[name]);
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

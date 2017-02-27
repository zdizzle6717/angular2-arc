import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../types/user';
import { AlertService } from '../../../../library/modules/alerts';
import { UserService } from '../../../../library/modules/auth';
import { ValidationService } from '../../../../library/modules/validation';

@Component({
    template: `
		<div class="row">
			<h1 class="push-bottom-2x">Register</h1>
			<hr />
			<div class="small-12 medium-6 medium-offset-3 large-4 large-offset-4 columns">
					<form [formGroup]="registrationForm" (ngSubmit)="register(registrationForm.value)">
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Username</label>
								<validate [errors]="formErrors['username']">
									<input type="text" formControlName="username" required/>
								</validate>
							</div>
						</div>
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Email</label>
								<validate [errors]="formErrors['email']">
									<input type="text" formControlName="email" required/>
								</validate>
							</div>
						</div>
						<label class="required">User Role</label>
						<validate [errors]="formErrors['role']">
							<select formControlName="role" required>
								<option value="">--Select--</option>
								<option value="siteAdmin">Site Admin</option>
								<option value="providerAdmin">Provider Admin</option>
								<option value="contactAdmin">Contact Admin</option>
							</select>
						</validate>
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Password</label>
								<validate [errors]="formErrors['password']">
									<input type="password" formControlName="password" required/>
								</validate>
							</div>
						</div>
						<div class="row">
							<div class="form-group small-12 columns">
								<label class="required">Repeat Password</label>
								<validate [errors]="formErrors['passwordRepeat']">
									<input type="password" formControlName="passwordRepeat" required/>
								</validate>
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
export class RegisterComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    public registrationForm: FormGroup;
    public formErrors: any;
    public credentials: User = {
        'isAuthenticated': false
    };
    public repeatedPassword: string;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private userService: UserService,
        private validationService: ValidationService
    ) { }

    public ngOnInit() {
        this.subscription = this.validationService.forms$.subscribe((forms) => {
            this.formErrors = forms['registrationForm'];
        });
        this.buildForm();
    }

		public buildForm(): void {
        this.registrationForm = this.validationService.buildForm('registrationForm', {
            'username': [this.credentials.username, [Validators.required, Validators.minLength(8)]],
            'email': [this.credentials.email, [Validators.required, this.validationService.simpleValidator('email')]],
            'role': [this.credentials.role, [Validators.required]],
            'password': [this.credentials.password, [Validators.required, Validators.minLength(8), this.validationService.simpleValidator('password')]],
            'passwordRepeat': [this.repeatedPassword, [Validators.required, Validators.minLength(8), this.validationService.simpleValidator('password')]]
        });
        this.registrationForm.valueChanges.subscribe((data) => this.validationService.onValueChanged('registrationForm', this.registrationForm, data));
    }

    public register(credentials: any) {
        if (credentials.password !== this.repeatedPassword) {
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

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Provider } from '../types/provider';
import { ProviderService } from '../services/provider.service';
import { AlertService } from '../../../library/modules/alerts';
import { ValidationService } from '../../../library/modules/validation';

@Component({
    'selector': 'provider-form',
    templateUrl: '../templates/providerForm.html'
})
export class ProviderFormComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    public provider: Provider = new Provider();
    public providers: Provider[] = [];
    public submitted = false;
    public providerForm: FormGroup;
    public formErrors: any;

    constructor(
        private alertService: AlertService,
        private providerService: ProviderService,
        private route: ActivatedRoute,
        private router: Router,
        private validationService: ValidationService,
        private formBuilder: FormBuilder
    ) { }

    public ngOnInit() {
        this.subscription = this.validationService.forms$.subscribe((forms) => {
            this.formErrors = forms['providerForm'];
        });
        this.buildForm();
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                if (params['id']) {
                    return this.providerService.getProvider(+params['id']);
                } else {
                    return Promise.resolve({});
                }
            })
            .subscribe((provider: Provider) => {
							this.provider = provider;
							this.buildForm();
						});
    }

    public buildForm(): void {
        this.providerForm = this.validationService.buildForm('providerForm', {
            'name': [this.provider.name, [Validators.required, Validators.minLength(5), Validators.maxLength(25), this.validationService.simpleValidator('name')]],
            'dba': [this.provider.dba, [Validators.required, this.validationService.simpleValidator('name')]],
            'legalName': [this.provider.legalName, [Validators.required, this.validationService.simpleValidator('name')]],
            'providerNumber': [this.provider.providerNumber, [Validators.required]],
            'identifierType': [this.provider.identifierType, [Validators.required]],
            'identifier': [this.provider.identifier, [Validators.required, this.validationService.simpleValidator('domesticPhone')]],
            'email': [this.provider.email, [Validators.required, this.validationService.simpleValidator('email')]],
            'phone': [this.provider.phone, [Validators.required, this.validationService.simpleValidator('domesticPhone')]],
            'state': [this.provider.state, [Validators.required]],
        });
        this.providerForm.valueChanges.subscribe((data) => this.validationService.onValueChanged('providerForm', this.providerForm, data));
    }

    public saveProvider(provider: Provider) {
        if (this.provider['id']) {
            this.providerService.updateProvider(this.provider['id'], provider).subscribe((response: any) => {
                this.provider = response;
                this.addAlert('providerUpdated', this.provider);
                this.router.navigate(['/providers']);
            }, (err) => {
                console.log(err);
            });
        } else {
            this.providerService.addProvider(provider).subscribe((response) => {
                this.provider = response;
                this.addAlert('providerCreated', this.provider);
            }, (err) => {
                console.log(err);
            });
        }
    }

    public addAlert(name: string, provider: Provider) {
        let options = {
            'providerCreated': {
                'title': 'Provider Record Created',
                'message': `Provider, ${provider.name}, with ID of ${provider.id} was successfully created.`,
                'type': 'success',
                'delay': 3000
            },
            'providerUpdated': {
                'title': 'Provider Record Updated',
                'message': `Provider, ${provider.name}, with ID of ${provider.id} was successfully updated.`,
                'type': 'success',
                'delay': 3000
            }
        };

        this.alertService.addAlert(options[name]);
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

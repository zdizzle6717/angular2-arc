import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Provider } from '../types/provider';
import { ProviderService } from '../services/provider.service';
import { AlertService } from '../../../library/modules/alerts';

@Component({
    'selector': 'provider-form',
    templateUrl: '../templates/providerForm.html'
})
export class ProviderFormComponent implements OnInit {
    public provider: Provider = new Provider();
    public providers: Provider[] = [];
    public submitted = false;

    constructor(
        private alertService: AlertService,
        private providerService: ProviderService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                if (params['id']) {
                    return this.providerService.getProvider(+params['id']);
                } else {
                    return Promise.resolve({});
                }
            })
            .subscribe((provider: Provider) => this.provider = provider);
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
}

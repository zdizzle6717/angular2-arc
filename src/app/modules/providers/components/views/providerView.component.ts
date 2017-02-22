import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../types/provider';

@Component({
    'selector': 'provider-view',
    templateUrl: '../../templates/providerView.html',
})
export class ProviderViewComponent implements OnInit {
    public provider: Provider = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProviderService
    ) { }

    public ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.service.getProvider(+params['id']))
            .subscribe((provider: Provider) => this.provider = provider);
    }
}

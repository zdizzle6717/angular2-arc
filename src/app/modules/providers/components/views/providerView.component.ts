import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../types/provider';

@Component({
    'selector': 'provider-view',
    'template': `
		<div class="row">
      <h1 class="push-bottom-2x">Provider: <strong>{{provider.name}}</strong>
      </h1>
      <h5>ID: {{provider.id}}</h5>
      <div class="row">
          <div class="small-12 medium-4 columns">
              <label>
                  <u>{{provider.identifierType}}</u>
              </label>
              <p class="text-justify">
                  {{provider.identifier}}
              </p>
          </div>
          <div class="small-12 medium-4 columns">
              <label>
                  <u>Provider Number</u>
              </label>
              <p class="text-justify">
                  {{provider.providerNumber}}
              </p>
          </div>
          <div class="small-12 medium-4 columns">
              <label>
                  <u>DBA</u>
              </label>
              <p class="text-justify">
                  {{provider.dba}}
              </p>
          </div>
      </div>
  </div>
	`,
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

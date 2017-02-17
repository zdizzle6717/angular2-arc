import { Component, OnInit } from '@angular/core';
import { Provider } from '../types/provider';
import { ProviderService } from '../services/provider.service';

@Component({
    'selector': 'provider-list',
    templateUrl: '../templates/providerList.html'
})
export class ProviderListComponent implements OnInit {
    public errorMessage: string;
    public providers: Provider[];

    constructor(private providerService: ProviderService) { }

    public ngOnInit() { this.getProviders(); }

    private getProviders() {
        this.providerService.getProviders().subscribe(
            (providers: Provider[]) => {
                return this.providers = providers;
            },
            (error: any) => this.errorMessage = error
        );
    }
}

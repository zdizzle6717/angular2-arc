import { Component, OnInit, Inject } from '@angular/core';
import { Provider } from '../types/provider';
import { ProviderService } from '../services/provider.service';
import { AlertService } from '../../../library/modules/alerts';
import { ModalService } from '../../../library/modules/modal';

@Component({
	'selector': 'provider-table',
	templateUrl: '../templates/providerTable.html'
})
export class ProviderTableComponent implements OnInit {
	public errorMessage: string;
	public providers: Provider[];

	constructor (
		private alertService: AlertService,
		private modalService: ModalService,
		private providerService: ProviderService
	) {}

	public ngOnInit() { this.getProviders(); }

	public getProviders() {
		this.providerService.getProviders().subscribe(
			(providers: Provider[]) => {
				return this.providers = providers;
			},
			(error: any) => this.errorMessage = error
		);
	}

	public openModal(provider: any) {
		this.modalService.showModal({
			'id': 'removeProvider',
			'content': `Delete provider, ${provider.name}, with ID of ${provider.id}?`,
			'actionButtonText': 'Confirm',
			'closeButtonText': 'Cancel',
			'model': {
				'provider': provider
			}
		});
	}

	public confirmModal(data: any) {
		this.removeProvider(data.provider);
	}

	public removeProvider(provider: Provider) {
		this.providerService.removeProvider(provider.id).subscribe(
			() => {
				let index = this.providers.findIndex((_provider) => {
					return +_provider.id === +provider.id;
				});
				if (index !== -1) {
					this.providers.splice(index, 1);
				}
				let alertConfig = {
					'title': 'Provider Record Deleted',
					'message': `Provider, ${provider.name}, with ID of ${provider.id} was successfully deleted.`,
					'type': 'info',
					'delay': 3000
				};
				this.alertService.addAlert(alertConfig);
				return this.providers;
			}
		);
	}
}

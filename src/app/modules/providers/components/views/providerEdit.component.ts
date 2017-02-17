import { Component } from '@angular/core';
import { Provider } from '../../types/provider';

@Component({
  'selector': 'provider-edit',
  'template': `
		<div class="row">
			<provider-form></provider-form>
		</div>
	`
})
export class ProviderEditComponent {
	public providers: Provider[];
}

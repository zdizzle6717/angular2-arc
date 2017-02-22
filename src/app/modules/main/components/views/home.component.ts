import { Component } from '@angular/core';

@Component({
  template: `
		<div class="row">
			<h1>Home</h1>
			<h4 class="push-bottom-2x">Providers</h4>
			<provider-table></provider-table>
			<hr/>
			<h4 class="push-bottom-2x">Contacts</h4>
			<contact-table></contact-table>
		</div>
	`
})
export class HomeComponent { }

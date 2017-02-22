import { Component } from '@angular/core';
import { Contact } from '../../types/contact';

@Component({
    'selector': 'contact-edit',
    'template': `
			<div class="row">
				<contact-form></contact-form>
			</div>
		`,
})
export class ContactEditComponent {
    public contacts: Contact[];
}

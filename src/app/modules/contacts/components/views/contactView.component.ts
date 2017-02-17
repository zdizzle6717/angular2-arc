import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../types/contact';

@Component({
    'selector': 'contact-view',
    'template': `
		<div class="row">
			<div>
				<h3 class="push-bottom-2x">View Contact: <strong>{{contact.firstName}} {{contact.middleName}} {{contact.lastName}}</strong></h3>
				<h5>ID: {{contact.id}}
				</h5>
				<div class="row">
					<div class="small-12 medium-4 columns">
						<label><u>Email</u></label>
						<p class="text-justify">
							{{contact.email}}
						</p>
					</div>
					<div class="small-12 medium-4 columns">
						<label><u>Mobile Phone</u></label>
						<p class="text-justify">
							{{contact.mobilePhone}}
						</p>
					</div>
					<div class="small-12 medium-4 columns">
						<label><u>Fax</u></label>
						<p class="text-justify">
							{{contact.fax}}
						</p>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class ContactViewComponent implements OnInit {
    public contact: Contact = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ContactService
    ) { }

    public ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.service.getContact(+params['id']))
            .subscribe((contact: Contact) => this.contact = contact);
    }
}

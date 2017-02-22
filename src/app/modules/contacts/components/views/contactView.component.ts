import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../types/contact';

@Component({
    'selector': 'contact-view',
    templateUrl: '../../templates/contactView.html',
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

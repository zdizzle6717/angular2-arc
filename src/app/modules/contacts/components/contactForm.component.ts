import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Contact } from '../types/contact';
import { ContactService } from '../services/contact.service';
import { AlertService } from '../../../library/modules/alerts';

@Component({
    'selector': 'contact-form',
    templateUrl: '../templates/contactForm.html'
})
export class ContactFormComponent implements OnInit {
    public contact: Contact = new Contact();
    public contacts: Contact[] = [];
    private submitted = false;

    constructor(
        private alertService: AlertService,
        private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                if (params['id']) {
                    return this.contactService.getContact(params['id']);
                } else {
                    return Promise.resolve({});
                }
            })
            .subscribe((contact: Contact) => {
                this.contact = contact;
            });
    }

    public saveContact(contact: Contact) {
        if (this.contact['id']) {
            this.contactService.updateContact(this.contact.id, contact).subscribe((response: any) => {
                this.contact = response;
                this.addAlert('contactUpdated', this.contact);
                this.router.navigate(['/contacts']);
            }, (err) => {
                console.log(err);
            });
        } else {
            this.contactService.addContact(contact).subscribe((response) => {
                this.contact = response;
                this.addAlert('contactCreated', this.contact);
            }, (err) => {
                console.log(err);
            });
        }
    }

    public addAlert(name: string, contact: Contact) {
        let options = {
            'contactCreated': {
                'title': 'Contact Record Created',
                'message': `Contact, ${contact.firstName} ${contact.lastName}, with ID of ${contact.id} was successfully created.`,
                'type': 'success',
                'delay': 3000
            },
            'contactUpdated': {
                'title': 'Contact Record Updated',
                'message': `Contact, ${contact.firstName} ${contact.lastName}, with ID of ${contact.id} was successfully updated.`,
                'type': 'success',
                'delay': 3000
            }
        };

        this.alertService.addAlert(options[name]);
    }
}

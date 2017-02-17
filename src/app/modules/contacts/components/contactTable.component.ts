import { Component, OnInit, Inject } from '@angular/core';
import { Contact } from '../types/contact';
import { ContactService } from '../services/contact.service';
import { AlertService } from '../../../library/modules/alerts';
import { ModalService } from '../../../library/modules/modal';

@Component({
    'selector': 'contact-table',
    templateUrl: '../templates/contactTable.html'
})
export class ContactTableComponent implements OnInit {
    public errorMessage: string;
    public contacts: Contact[];

    constructor(
        private alertService: AlertService,
        private modalService: ModalService,
        private service: ContactService
    ) { }

    public ngOnInit() { this.getContacts(); }

    public getContacts() {
        this.service.getContacts().subscribe(
            (contacts: Contact[]) => {
                return this.contacts = contacts;
            },
            (error: any) => this.errorMessage = error
        );
    }

    public openModal(contact: any) {
        this.modalService.showModal({
            'id': 'removeContact',
            'content': `Delete contact, ${contact.firstName} ${contact.lastName}, with ID of ${contact.id}?`,
            'actionButtonText': 'Confirm',
            'closeButtonText': 'Cancel',
            'model': {
                'contact': contact
            }
        });
    }

    public confirmModal(data: any) {
        this.removeContact(data.contact);
    }

    public removeContact(contact: Contact) {
        this.service.removeContact(contact.id).subscribe(
            () => {
                let index = this.contacts.findIndex((_contact) => {
                    return +_contact.id === +contact.id;
                });
                if (index !== -1) {
                    this.contacts.splice(index, 1);
                }
                let alertConfig = {
                    'title': 'Contact Record Deleted',
                    'message': `Contact, ${contact.firstName} ${contact.lastName}, with ID of ${contact.id} was successfully deleted.`,
                    'type': 'info',
                    'delay': 3000
                };
                this.alertService.addAlert(alertConfig);
                return this.contacts;
            }
        );
    }
}

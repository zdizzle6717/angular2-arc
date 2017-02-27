import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Contact } from '../types/contact';
import { ContactService } from '../services/contact.service';
import { AlertService } from '../../../library/modules/alerts';
import { ValidationService } from '../../../library/modules/validation';

@Component({
    'selector': 'contact-form',
    templateUrl: '../templates/contactForm.html'
})
export class ContactFormComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    public contact: Contact = new Contact();
    public contacts: Contact[] = [];
    public contactForm: FormGroup;
    public formErrors: any;

    private submitted = false;

    constructor(
        private alertService: AlertService,
        private contactService: ContactService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private validationService: ValidationService
    ) { }

    public ngOnInit() {
        this.subscription = this.validationService.forms$.subscribe((forms) => {
            this.formErrors = forms['contactForm'];
        });
        this.buildForm();
        this.route.params
            .switchMap((params: Params) => {
                if (params['id']) {
                    return this.contactService.getContact(params['id']);
                } else {
                    return Promise.resolve({});
                }
            })
            .subscribe((contact: Contact) => {
                this.contact = contact;
                this.buildForm();
            });
    }

    public buildForm(): void {
        this.contactForm = this.validationService.buildForm('contactForm', {
            'firstName': [this.contact.firstName, [Validators.required, Validators.maxLength(15), this.validationService.simpleValidator('name')]],
            'middleName': [this.contact.middleName, [Validators.required, this.validationService.simpleValidator('name')]],
            'lastName': [this.contact.lastName, [Validators.required, this.validationService.simpleValidator('name')]],
            'gender': [this.contact.gender, [Validators.required]],
            'email': [this.contact.email, [Validators.required, this.validationService.simpleValidator('email')]],
            'mobilePhone': [this.contact.mobilePhone, [Validators.required, this.validationService.simpleValidator('domesticPhone')]],
            'fax': [this.contact.fax, [Validators.required, this.validationService.simpleValidator('domesticPhone')]],
            'type': [this.contact.type, [Validators.required]],
            'status': [this.contact.status, [Validators.required]],
            'maritalStatus': [this.contact.maritalStatus, [Validators.required]],
        });
        this.contactForm.valueChanges.subscribe((data) => this.validationService.onValueChanged('contactForm', this.contactForm, data));
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

		public ngOnDestroy() {
			this.subscription.unsubscribe();
		}
}

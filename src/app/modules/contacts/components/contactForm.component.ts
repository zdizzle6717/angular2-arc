import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
    public contactForm: FormGroup;
    public formErrors = {
        'firstName': '',
        'lastName': ''
    };
    public validationMessages = {
        'firstName': {
            'required': 'Name is required.',
            'maxlength': 'Max length is 15.',
            'forbiddenName': 'This name is forbidden.'
        },
        'lastName': {
            'required': 'Power is required.'
        }
    };
    private submitted = false;

    constructor(
        private alertService: AlertService,
        private contactService: ContactService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit() {
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
        this.contactForm = this.formBuilder.group({
            'firstName': [this.contact.firstName, [Validators.required, Validators.maxLength(15), this.nameValidator(/bob/i)]],
            'middleName': [this.contact.middleName, [Validators.required]],
            'lastName': [this.contact.lastName, [Validators.required]],
            'gender': [this.contact.gender, [Validators.required]],
            'email': [this.contact.email, [Validators.required]],
            'mobilePhone': [this.contact.mobilePhone, [Validators.required]],
            'fax': [this.contact.fax, [Validators.required]],
            'type': [this.contact.type, [Validators.required]],
            'status': [this.contact.status, [Validators.required]],
            'maritalStatus': [this.contact.maritalStatus, [Validators.required]],
        });
        this.contactForm.valueChanges
            .subscribe((data) => this.onValueChanged(data));
        this.onValueChanged();
    }

    public nameValidator(regEx: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;
            const forbidden = regEx.test(name);
            return forbidden ? { 'forbiddenName': { name } } : null;
        };
    }

    public onValueChanged(data?: any) {
        if (!this.contactForm) { return; }
        const form = this.contactForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            console.log(messages);
                            console.log(key);
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
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

'use strict';

import { Injectable, Inject } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { defaultValidations } from '../constants/defaultValidations.ts';

@Injectable()
export class ValidationService {
    public forms = new BehaviorSubject<any>({});
    public forms$ = this.forms.asObservable();

    constructor(private formBuilder: FormBuilder) { }

    public buildForm(formName: string, formConfig: any): FormGroup {
        let formProperties = Object.getOwnPropertyNames(formConfig);
        let formErrors = {};
        formProperties.forEach((prop) => {
            formErrors[prop] = [];
        });
        let configuredForm = this.formBuilder.group(formConfig);
        let updatedForms = Object.assign({}, this.forms.value);
        updatedForms[formName] = formErrors;
        this.forms.next(updatedForms);
        return configuredForm;
    }

    public onValueChanged(formName: string, form: FormGroup, data?: any) {
        if (!form) { return; }
        let forms = Object.assign({}, this.forms.value);
        let formErrors = forms[formName];
        for (const field in formErrors) {
            if (formErrors.hasOwnProperty(field)) {
                formErrors[field] = [];
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            if (defaultValidations.hasOwnProperty(key)) {
                                formErrors[field].push(defaultValidations[key].message);
                            } else {
                                // Error messages for angular built-in validators
                                switch (key) {
                                    case 'required':
                                        formErrors[field].push(`Required Field`);
                                        break;
                                    case 'minlength':
                                        formErrors[field].push(`Min length of ${control.errors[key].requiredLength}`);
                                        break;
                                    case 'maxlength':
                                        formErrors[field].push(`Max length of ${control.errors[key].requiredLength}`);
                                        break;
                                    default:
                                        console.log('Unhandled validation');
                                        formErrors[field].push('Invalid Entry');
                                }
                            }
                        }
                    }
                }
            }
        }
        this.forms.next(forms);
    }

    public simpleValidator(valName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!defaultValidations.hasOwnProperty(valName)) {
                throw new Error(`The validation name, ${valName}, was not found in the default validations list.`);
            }
            let name = control.value;
            let regex = (defaultValidations[valName] && defaultValidations[valName].regex) ? defaultValidations[valName].regex : /[\s\S]*/;
            let validity = regex.test(name);
            return !validity ? { [valName]: { name } } : null;
        };
    }

};

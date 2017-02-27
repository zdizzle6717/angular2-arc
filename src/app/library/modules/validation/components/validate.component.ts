import { Component, Input } from '@angular/core';

@Component({
    'selector': 'validate',
    'providers': [],
    templateUrl: '../templates/validate.html',
})
export class ValidateComponent {
	public inputErrors: string[];

	@Input() set errors(inputErrors: string[]) {
    this.inputErrors = inputErrors;
  }
}

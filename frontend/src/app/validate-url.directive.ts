import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const urlValidator = (control: AbstractControl): ValidationErrors | null => {
  const hasUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(control.value);
  if (hasUrl) {
    return null;
  }
  return {url: true};
};

@Directive({
  selector: '[appUrl]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateUrlDirective,
    multi: true
  }]
})
export class ValidateUrlDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return urlValidator(control);
  }
}

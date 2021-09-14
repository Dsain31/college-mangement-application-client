import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommonValidationService {
  emailPattern = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/i;
  onlyNumeric = "^[0-9]*$";
  constructor() { }

  setCustomValidatorMethods(options?: {
    min?: number; max?: number;
    isEmailPattern?: boolean;
    isNumericPattern?: boolean; }): ValidationErrors {
    if (!_.isEmpty(options)) {
      const commonValidations = [
        Validators.required,
        this.customMinimumLengthValidation(options.min),
        this.customMaximumLengthValidation(options.max),
        this.noWhitespaceValidation()
      ];
      if(options.isEmailPattern) {
        commonValidations.push(Validators.pattern(this.emailPattern));
      }
      if(options.isNumericPattern) {
        commonValidations.push(Validators.pattern(this.onlyNumeric));
      }
      return commonValidations;
    }
  }

  getErrorMessage(options: { formControl: AbstractControl; formControlName: string; maxLength?: number; minLength?: number }): string {
    return options.formControl.hasError('required') || options.formControl.hasError('noWhitespaceValidation')
      ? `${options.formControlName} is required` :
      options.formControl.hasError('customMinimumLengthValidation')
        ? `${options.formControlName} should be at least ${options.minLength} characters` :
        options.formControl.hasError('pattern') ? `${options.formControlName} is invalid` :
          options.formControl.hasError('customMaximumLengthValidation')
            ? `${options.formControlName} should not be more than ${options.maxLength} character.` :
            '';
  }

  private noWhitespaceValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const noWhitespace = String((control.value || '')).trim().length !== 0;
      const isValid = noWhitespace;
      return isValid ? null : { noWhitespaceValidation: true };
    };
  }

  private customMinimumLengthValidation(keyLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      return String(control.value).trim().length < keyLength
        ? { customMinimumLengthValidation: true }
        : null;
    };
  }

  private customMaximumLengthValidation(keyLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      return String(control.value).trim().length > keyLength
        ? { customMaximumLengthValidation: true }
        : null;
    };
  }

}

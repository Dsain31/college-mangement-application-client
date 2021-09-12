import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommonValidationService {

  constructor() { }

  setCustomValidatorMethods(options?: { min?: number; max?: number }): ValidationErrors {
    if (!_.isEmpty(options)) {
      const commonValidations = [
        Validators.required,
        this.customMinimumLengthValidation(options.min),
        this.customMaximumLengthValidation(options.max),
        this.noWhitespaceValidation()
      ];
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

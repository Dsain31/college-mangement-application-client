import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: '../../view/login/login.component.html',
  styleUrls: ['../../view/login/login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean;
  constructor(private fb: FormBuilder,
    private commonValidationService: CommonValidationService) { }

  ngOnInit() {
    this.initializeProperties();
  }

  initializeProperties(): void {
    this.initializeLoginForm();
  }
  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', this.commonValidationService.setCustomValidatorMethods({max: 20})],
      password: ['', this.commonValidationService.setCustomValidatorMethods({min: 6, max: 16})]
    });
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if(this.loginForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    console.log(this.loginForm.value);
  }

  getErrorMessage(options: {formControl: AbstractControl; formControlName: string; maxLength?: number; minLength?: number}): string {
    return this.commonValidationService.getErrorMessage({
      formControl: options.formControl,
      formControlName: options.formControlName,
      maxLength: options?.maxLength,
      minLength:options?.minLength
    });
  }

}

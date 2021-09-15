import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from 'src/app/global/auth/auth.service';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../../view/dashboard/dashboard.component.html',
  styleUrls: ['../../view/dashboard/dashboard.component.scss'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  courseForm: FormGroup;
  constructor(
    private commonValidationService: CommonValidationService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkAuthLogin();
    this.initializeProperties();
  }

  initializeProperties(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.courseForm = this.fb.group({
      username: ['', this.commonValidationService.setCustomValidatorMethods()],
      password: ['', this.commonValidationService.setCustomValidatorMethods({min: 6, max: 16})]
    });
  }
  checkAuthLogin(): void {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['login']);
    }
  }

  onSubmit(): void {

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

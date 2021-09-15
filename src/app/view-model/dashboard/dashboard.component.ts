import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from 'src/app/global/auth/auth.service';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../../view/dashboard/dashboard.component.html',
  styleUrls: ['../../view/dashboard/dashboard.component.scss'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  courseForm: FormGroup;
  isSubmitted: boolean;
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
      address: ['', [Validators.required]],
      mobileNumber: ['', this.commonValidationService.setCustomValidatorMethods({max: 10, isNumericPattern: true})],
      age: ['', this.commonValidationService.setCustomValidatorMethods({max: 2, isNumericPattern: true})],
      education: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      status: [CommonStatus.PENDING]

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

  get subject(): AbstractControl {
    return this.courseForm.get('subject');
  }
  get mNumber(): AbstractControl {
    return this.courseForm.get('mobileNumber');
  }
  get address(): AbstractControl {
    return this.courseForm.get('address');
  }

  get age(): AbstractControl {
    return this.courseForm.get('age');
  }

  get education(): AbstractControl {
    return this.courseForm.get('education');
  }
}

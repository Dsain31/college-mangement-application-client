import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from 'src/app/global/auth/auth.service';
import { courseList, subjectList} from 'src/app/global/model/register/register.model';
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
  subjectList: typeof subjectList;
  courseList: typeof courseList;
  constructor(
    private commonValidationService: CommonValidationService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkAuthLogin();
  }

  initializeProperties(): void {
    this.initializeLoginForm();
    this.subjectList = subjectList;
    this.courseList = courseList;
  }

  initializeLoginForm(): void {
    this.courseForm = this.fb.group({
      address: ['', this.commonValidationService.setCustomValidatorMethods({isEmailPattern: false})],
      fullName: ['', this.commonValidationService.setCustomValidatorMethods({isEmailPattern: false})],
      fatherName: ['', this.commonValidationService.setCustomValidatorMethods({isEmailPattern: false})],
      motherName: ['', this.commonValidationService.setCustomValidatorMethods({isEmailPattern: false})],
      mobileNumber: ['', this.commonValidationService.setCustomValidatorMethods({max: 10, isNumericPattern: true})],
      age: ['', this.commonValidationService.setCustomValidatorMethods({max: 2, isNumericPattern: true})],
      seniorClassMarks: ['', this.commonValidationService.setCustomValidatorMethods({max: 2, isNumericPattern: true})],
      secondaryClassMarks: ['', this.commonValidationService.setCustomValidatorMethods({max: 2, isNumericPattern: true})],
      subject: ['', [Validators.required]],
      course: ['', [Validators.required]],
      status: [CommonStatus.PENDING]

    });
  }
  checkAuthLogin(): void {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['login']);
    } else {
      this.initializeProperties();
    }
  }

  onSubmit(): void {
    if(this.courseForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    console.log(this.courseForm.value);
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

  get seniorClassMarks(): AbstractControl {
    return this.courseForm.get('seniorClassMarks');
  }
  get secondaryClassMarks(): AbstractControl {
    return this.courseForm.get('secondaryClassMarks');
  }
  get education(): AbstractControl {
    return this.courseForm.get('education');
  }
  get course(): AbstractControl {
    return this.courseForm.get('course');
  }
  get motherName(): AbstractControl {
    return this.courseForm.get('motherName');
  }
  get fullName(): AbstractControl {
    return this.courseForm.get('fullName');
  }
  get fatherName(): AbstractControl {
    return this.courseForm.get('fatherName');
  }
}

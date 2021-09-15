import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { subjectList, courseList } from 'src/app/global/model/register/register.model';
import { Application } from 'src/app/interfaces/applicaiton/application';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-application-form',
  templateUrl: '../../../../view/application/components/application-form/application-form.component.html',
  styleUrls: ['../../../../view/application/components/application-form/application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit, AfterContentChecked, OnChanges {
  @Input() isDisable: boolean;
  @Input() isEditable: boolean;
  @Input() courseFormData: Application;
  @Output() courseFormApplied: EventEmitter<Application> = new EventEmitter<Application>();
  courseForm: FormGroup;
  isSubmitted: boolean;
  subjectList: typeof subjectList;
  courseList: typeof courseList;
  userRole: typeof UserRoles;
  role: number;
  constructor(
    private commonValidationService: CommonValidationService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initializeProperties();
  }

  ngAfterContentChecked() {
    this.role = +localStorage.getItem('role');
  }

  ngOnChanges() {
    this.patchData();
  }

  initializeProperties(): void {
    this.initializeLoginForm();
    this.subjectList = subjectList;
    this.courseList = courseList;
    this.userRole = UserRoles;
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

  onSubmit(): void {
    if(this.courseForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.courseFormApplied.emit(this.courseForm.value);
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

  patchData() {
    if (this.isDisable) {
      this.courseForm.patchValue(this.courseFormData);
      this.courseForm.disable();
    }
    if (this.isEditable) {
      this.courseForm.patchValue(this.courseFormData);
    }
  }

}

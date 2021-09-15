import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AuthService } from 'src/app/global/auth/auth.service';
import { TypeAttribute, commonAttributes, actionList } from 'src/app/global/model/common/common.model';
import { courseList, subjectList} from 'src/app/global/model/register/register.model';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-application',
  templateUrl: '../../view/application/application.component.html',
  styleUrls: ['../../view/application/application.component.scss'],
  providers: [AuthService]
})
export class ApplicationComponent implements OnInit, AfterContentChecked {
  courseForm: FormGroup;
  isSubmitted: boolean;
  subjectList: typeof subjectList;
  courseList: typeof courseList;
  commonAttribute: TypeAttribute<typeof commonAttributes, any>;
  actionList: typeof actionList;
  commonStatus: typeof CommonStatus;
  userRole: typeof UserRoles;
  role: number;
  constructor(
    private commonValidationService: CommonValidationService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
   }

  ngOnInit() {
    this.checkAuthLogin();
  }

  ngAfterContentChecked() {
    this.role = +localStorage.getItem('role');
  }

  initializeProperties(): void {
    this.initializeLoginForm();
    this.subjectList = subjectList;
    this.courseList = courseList;
    this.commonAttribute = commonAttributes;
    this.actionList = actionList;
    this.commonStatus = CommonStatus;
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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    window.scrollTo(0, 0);// for top scroll
    // this.getUserList(this.commonAttribute.limit, startItem, UserRoles.ADMIN);
  }
}

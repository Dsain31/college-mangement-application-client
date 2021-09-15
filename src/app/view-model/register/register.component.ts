import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { registerUserSelectRole, educationList, departmentList, subjectList } from 'src/app/global/model/register/register.model';
import { RegisterService } from 'src/app/model/register/register.service';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: '../../view/register/register.component.html',
  styleUrls: ['../../view/register/register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted: boolean;
  userRole: typeof UserRoles;
  userSelectRoleList: typeof registerUserSelectRole;
  isStudent = true;
  educationList: typeof educationList;
  departmentList: typeof departmentList;
  subjectList: typeof subjectList;
  constructor(private fb: FormBuilder,
    private commonValidationService: CommonValidationService,
    private registerService: RegisterService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initializeProperties();
  }

  initializeProperties(): void {
    this.initializeLoginForm();
    this.userRole = UserRoles;
    this.userSelectRoleList = registerUserSelectRole;
    this.educationList = educationList;
    this.departmentList = departmentList;
    this.subjectList = subjectList;
  }
  initializeLoginForm(): void {
    this.registerForm = this.fb.group({
      userRole: [UserRoles.USER, [Validators.required]],
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      username: ['', this.commonValidationService.setCustomValidatorMethods({max: 20})],
      email: ['', this.commonValidationService.setCustomValidatorMethods({min:6, isEmailPattern: true})],
      password: ['', this.commonValidationService.setCustomValidatorMethods({min: 6, max: 16})],
      address: ['', [Validators.required]],
      mobileNumber: ['', this.commonValidationService.setCustomValidatorMethods({max: 10, isNumericPattern: true})],
      age: ['', this.commonValidationService.setCustomValidatorMethods({max: 2, isNumericPattern: true})],
      education: ['', [Validators.required]],
      department: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      status: [CommonStatus.PENDING]
    });
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get role(): AbstractControl {
    return this.registerForm.get('userRole');
  }
  get fName(): AbstractControl {
    return this.registerForm.get('fName');
  }
  get lName(): AbstractControl {
    return this.registerForm.get('lName');
  }
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get mNumber(): AbstractControl {
    return this.registerForm.get('mobileNumber');
  }
  get address(): AbstractControl {
    return this.registerForm.get('address');
  }

  get age(): AbstractControl {
    return this.registerForm.get('age');
  }

  get education(): AbstractControl {
    return this.registerForm.get('education');
  }
  get department(): AbstractControl {
    return this.registerForm.get('department');
  }
  get subject(): AbstractControl {
    return this.registerForm.get('subject');
  }

  onSubmit() {
    this.removeDepartmentControl();
    if (this.registerForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.registerService.registerUser(this.registerForm.value).subscribe((res) => {
      this.toastr.success(res.message);
      this.registerForm.reset();
    }, error => {
      this.toastr.error(error);
    });
  }

  getErrorMessage(options: {formControl: AbstractControl; formControlName: string; maxLength?: number; minLength?: number}): string {
    return this.commonValidationService.getErrorMessage({
      formControl: options.formControl,
      formControlName: options.formControlName,
      maxLength: options?.maxLength,
      minLength:options?.minLength
    });
  }

  changeFormByRole(event: Event): void {
    const role = (event.target as HTMLInputElement).value;
    if(+role === this.userRole.ADMIN) {
      this.removeFormControlForAdminRole();
      this.isStudent = false;
    } else {
      this.initializeLoginForm();
      this.registerForm.removeControl('department');
      this.isStudent = true;
    }
    this.registerForm.updateValueAndValidity();
  }

  removeDepartmentControl() {
    if(this.isStudent) {
      this.registerForm.removeControl('department');
      this.registerForm.updateValueAndValidity();
    }
  }

  removeFormControlForAdminRole() {
    const resetValidations = ['userRole', 'fName', 'lName', 'department', 'password', 'username', 'email'];
      Object.keys(this.registerForm.controls).forEach(key => {
        if (!resetValidations.includes(key)) {
          this.registerForm.removeControl(key);
        }
      });
  }

}

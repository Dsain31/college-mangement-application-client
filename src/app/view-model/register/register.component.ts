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
  }
  initializeLoginForm(): void {
    this.registerForm = this.fb.group({
      userRole: ['', [Validators.required]],
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      username: ['', this.commonValidationService.setCustomValidatorMethods({max: 20})],
      email: ['', this.commonValidationService.setCustomValidatorMethods({min:6, isEmailPattern: true})],
      password: ['', this.commonValidationService.setCustomValidatorMethods({min: 6, max: 16})],
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

  onSubmit() {
    if (this.registerForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.registerService.registerUser(this.registerForm.value).subscribe((res) => {
      this.toastr.success(res.message);
      this.initializeLoginForm();
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

}

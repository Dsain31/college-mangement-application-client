/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/auth/auth.service';
import { LoginService } from 'src/app/model/login/login.service';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';
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
    private commonValidationService: CommonValidationService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) {

    }

  ngOnInit() {
    this.initializeProperties();
    this.checkAuthLogin();
  }


  checkAuthLogin(): void {
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('role')) {
        const userRole = +localStorage.getItem('role');
        const userRoleCases = {
          [UserRoles.ADMIN]: () => {
            this.router.navigate(['student-list']);
          },
          [UserRoles.USER]: () => {
            this.router.navigate(['dashboard']);
          },
          [UserRoles.SUPER_ADMIN]: () => {
            this.router.navigate(['admin-list']);
          }
        };
        userRoleCases[userRole]();
      }
    }
  }

  initializeProperties(): void {
    this.initializeLoginForm();
  }
  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', this.commonValidationService.setCustomValidatorMethods()],
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
    this.loginService.loginUser(this.loginForm.value).subscribe((res) => {
      this.toastr.success(res.message);
      localStorage.setItem('id', res.data?._id);
      this.authService.subject.next(true);
      this.setValueForUserRole(res.data.userRole);
    }, (error) => {
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

  setValueForUserRole(userRole: number) {
    const userRoleCases = {
      [UserRoles.ADMIN]: () => {
        localStorage.setItem('role', String(userRole));
        this.router.navigate(['student-list']);
      },
      [UserRoles.USER]: () => {
        localStorage.setItem('role', String(userRole));
        this.router.navigate(['dashboard']);
      },
      [UserRoles.SUPER_ADMIN]: () => {
        localStorage.setItem('role', String(userRole));
        this.router.navigate(['admin-list']);
      }
    };
    userRoleCases[userRole]();
  }

}

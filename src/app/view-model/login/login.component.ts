/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/auth/auth.service';
import { userData } from 'src/app/global/modules/login/login';
import { User } from 'src/app/interfaces/user/user';
import { LoginService } from 'src/app/model/login/login.service';
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
    this.checkAuthLogin();

    }

  ngOnInit() {
    this.initializeProperties();
  }

  checkAuthLogin(): void {
    if (localStorage.getItem('id')) {
      this.router.navigate(['/home']);
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
    this.loginService.loginUser(this.loginForm.value).subscribe((res: {data: User}) => {
      this.authService.isLogIn(res.data?._id);
      localStorage.setItem('id', res.data?._id);
      this.router.navigate(['/home']);
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

}

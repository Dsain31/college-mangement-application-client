import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/auth/auth.service';
import { headerElements } from 'src/app/global/model/header/header.elements';
import SystemConstants from 'src/app/utils/constants/system/system.constants';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';

@Component({
  selector: 'app-header',
  templateUrl: '../../view/header/header.component.html',
  styleUrls: ['../../view/header/header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  headerElements: typeof headerElements;
  isLoggedIn = false;
  role: number;
  userRole: typeof UserRoles;
  constructor( private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
  }
  ngOnInit() {
    this.initializeProperties();
  }

  initializeProperties(): void {
    this.headerElements = headerElements;
  }

  checkAuthLogin(): void {
    if (localStorage.getItem('id')) {
      this.role = JSON.parse(localStorage.getItem('role'));
      this.userRole = UserRoles;
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngAfterContentChecked() {
    this.checkAuthLogin();
  }

  logout() {
    this.authService.isLogIn(null);
    localStorage.clear();
    this.toastr.success(SystemConstants.LOGGED_OUT_SUCCESS_MSG);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}

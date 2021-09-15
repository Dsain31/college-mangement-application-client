import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/auth/auth.service';
import { commonAttributes, TypeAttribute, userData } from 'src/app/global/model/common/common.model';
import { User } from 'src/app/interfaces/user/user';
import { HomeService } from 'src/app/model/home/home.service';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';

@Component({
  selector: 'app-home',
  templateUrl: '../../view/home/home.component.html',
  styleUrls: ['../../view/home/home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  commonAttribute: TypeAttribute<typeof commonAttributes, any>;
  userList: User[];
  constructor(private authService: AuthService,
    private router: Router,
    private homeService: HomeService,
    private toastr: ToastrService
    ) {
     }

  ngOnInit() {
    this.checkAuthLogin();
    this.commonAttribute = commonAttributes;
    this.getUserList(this.commonAttribute.limit, this.commonAttribute.skip);
    this.getUserListCount(UserRoles.USER);
  }

  ngAfterContentChecked() {}

  checkAuthLogin(): void {
    this.authService.user$.subscribe((value: typeof userData) => {
      console.log('home', value);
      if (value._id) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  getUserList(limit: number, skip: number, role?: number) {
    const queryObj = {limit, skip, role};
    this.homeService.getUserList(queryObj).subscribe((res) => {
      this.userList = res.data;
    },(error) => {
      this.toastr.error(error);
    });
  }

  getUserListCount(role: number) {
    const queryObj = {role};
    this.homeService.getUserListCount(queryObj).subscribe((res) => {
      console.log(res);
    });
  }

  changePage(event: any) {
    console.log(event);
  }

}

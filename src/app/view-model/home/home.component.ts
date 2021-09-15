import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/global/auth/auth.service';
import { actionList, commonAttributes, TypeAttribute, userData } from 'src/app/global/model/common/common.model';
import { User } from 'src/app/interfaces/user/user';
import { HomeService } from 'src/app/model/home/home.service';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';

@Component({
  selector: 'app-home',
  templateUrl: '../../view/home/home.component.html',
  styleUrls: ['../../view/home/home.component.scss'],
})
export class HomeComponent implements OnInit {
  commonAttribute: TypeAttribute<typeof commonAttributes, any>;
  userList: User[];
  actionList: typeof actionList;
  constructor(private authService: AuthService,
    private router: Router,
    private homeService: HomeService,
    private toastr: ToastrService
    ) {
     }

  ngOnInit() {
    this.checkAuthLogin();
  }

  initializeProperties() {
    this.commonAttribute = commonAttributes;
    this.actionList = actionList;
  }

  checkAuthLogin(): void {
    this.authService.user$.subscribe((value: typeof userData) => {
      if (value._id) {
        this.initializeProperties();
        this.getUserListAndCount(this.commonAttribute.limit, this.commonAttribute.skip);
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

  getUserListCount(role?: number) {
    const queryObj = {role};
    this.homeService.getUserListCount(queryObj).subscribe((res) => {
      this.commonAttribute.userListCount = res.data || 0;
    },(error) => {
      this.toastr.error(error);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    window.scrollTo(0, 0)// for top scroll
    this.getUserList(this.commonAttribute.limit, startItem);
  }

  getUserListAndCount(limit: number, skip: number, role?: number) {
    forkJoin([
      this.getUserList(limit, skip, role),
      this.getUserListCount(role)
    ]);
  }

  selectAction(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
  }

}

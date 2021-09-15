import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { actionList, commonAttributes, showActionByColor, TypeAttribute } from 'src/app/global/model/common/common.model';
import { User } from 'src/app/interfaces/user/user';
import { HomeService } from 'src/app/model/home/home.service';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';

@Component({
  selector: 'app-home',
  templateUrl: '../../view/home/home.component.html',
  styleUrls: ['../../view/home/home.component.scss'],
})
export class HomeComponent implements OnInit {
  commonAttribute: TypeAttribute<typeof commonAttributes, any>;
  userList: User[];
  actionList: typeof actionList;
  commonStatus: typeof CommonStatus;
  showChipsByColor: typeof showActionByColor;
  constructor(
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
    this.commonStatus = CommonStatus;
    this.showChipsByColor = showActionByColor;;
  }

  checkAuthLogin(): void {
    if (localStorage.getItem('id')) {
      this.initializeProperties();
      this.getUserListAndCount(this.commonAttribute.limit, this.commonAttribute.skip);
    } else {
      this.router.navigate(['/login']);
    }
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
    window.scrollTo(0, 0);// for top scroll
    this.getUserList(this.commonAttribute.limit, startItem);
  }

  getUserListAndCount(limit: number, skip: number, role?: number) {
    forkJoin([
      this.getUserList(limit, skip, role),
      this.getUserListCount(role)
    ]);
  }

  actionSelected(event: Event, id: string, index: number): void {
    const target = event.target as HTMLInputElement;
    this.updateUser(id, +target.value, index);
  }

  updateUser(id: string, status: number, index: number): void {
    this.homeService.updateUserById(id, {status}).subscribe((res) => {
      this.toastr.success(res.message);
      this.userList[index].status= status;
    }, (error) => {
      this.toastr.error(error);
    });
  }

}

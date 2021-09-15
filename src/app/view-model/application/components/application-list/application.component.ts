import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/auth/auth.service';
import { TypeAttribute, commonAttributes, actionList } from 'src/app/global/model/common/common.model';
import { Application } from 'src/app/interfaces/applicaiton/application';
import { ApplicationService } from 'src/app/model/application.service';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';
import { CommonValidationService } from 'src/app/utils/services/validation/common-validation.service';

@Component({
  selector: 'app-application',
  templateUrl: '../../../../view/application/components/application-list/application.component.html',
  styleUrls: ['../../../../view/application/components/application-list/application.component.scss'],
  providers: [AuthService]
})
export class ApplicationComponent implements OnInit, AfterContentChecked {
  commonAttribute: TypeAttribute<typeof commonAttributes, any>;
  actionList: typeof actionList;
  commonStatus: typeof CommonStatus;
  userRole: typeof UserRoles;
  role: number;
  courseFormData: Application;
  isDisable = false;
  isEditable = false;
  applicationList = [{
    "address": "jaipur",
    "age": "12",
    "course": "Economics and Finance",
    "fatherName": "dsdasd",
    "fullName": "deepkaa",
    "mobileNumber": "9090909090",
    "motherName": "asd",
    "secondaryClassMarks": "23",
    "seniorClassMarks": "12",
    "status": 0
  }];
  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private toastr: ToastrService,
  ) {
   }

  ngOnInit() {
    this.checkAuthLogin();
  }

  ngAfterContentChecked() {
    this.role = +localStorage.getItem('role');
  }

  initializeProperties(): void {
    this.commonAttribute = commonAttributes;
    this.actionList = actionList;
    this.commonStatus = CommonStatus;
    this.userRole = UserRoles;
  }

  checkAuthLogin(): void {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['login']);
    } else {
      this.initializeProperties();
    }
  }

  onSubmit(data: Application): void {
    data.userId = localStorage.getItem('id') ? localStorage.getItem('id'): '';
    this.applicationService.createApplication(data).subscribe((res) => {
      this.toastr.success(res.message);
    }, (error) => {
      this.toastr.error(error);
    });
  }
 
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    window.scrollTo(0, 0);// for top scroll
    // this.getUserList(this.commonAttribute.limit, startItem, UserRoles.ADMIN);
  }

  showApplicationData(application?: Application) {
    this.isEditable = true;
    this.courseFormData = application;
  }

  editApplicationData(application?: Application) {
    this.isEditable = true;
    this.courseFormData = application;
  }

  updateApplication(id: string, status: number, index: number): void {
    this.applicationService.updateApplicationById(id, {status}).subscribe((res) => {
      this.toastr.success(res.message);
      this.applicationList[index].status= status;
      this.toastr.success(res.message);
    }, (error) => {
      this.toastr.error(error);
    });
  }

  actionSelected(event: Event, id: string, index: number): void {
    const target = event.target as HTMLInputElement;
    this.updateApplication(id, +target.value, index);
  }
}

import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AuthService } from 'src/app/global/auth/auth.service';
import { TypeAttribute, commonAttributes, actionList } from 'src/app/global/model/common/common.model';
import { Application } from 'src/app/interfaces/applicaiton/application';
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
    console.log(this.applicationList);
  }
 
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    window.scrollTo(0, 0);// for top scroll
    // this.getUserList(this.commonAttribute.limit, startItem, UserRoles.ADMIN);
  }

  showApplicationData(application: Application) {
    this.isDisable = true;
    this.courseFormData = application;
  }
}

import { AfterContentChecked, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/global/auth/auth.service';
import { TypeAttribute, commonAttributes, actionList } from 'src/app/global/model/common/common.model';
import { Application } from 'src/app/interfaces/applicaiton/application';
import { ApplicationService } from 'src/app/model/application.service';
import { CommonStatus } from 'src/app/utils/constants/common/common.status';
import { UserRoles } from 'src/app/utils/constants/user-roles/user.roles';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  applicationList: Application[];
  isFormVisibleForm = true;
  isVisibleCommentBox = false;
  modalRef?: BsModalRef;
  commentData: string;
  isSubmitted: boolean;
  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private toastr: ToastrService,
    private modalService: BsModalService
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
      this.getUserListAndCount(this.commonAttribute.limit, this.commonAttribute.skip);
    }
  }

  onSubmit(data: Application): void {
    if (_.isEmpty(data)) {
      this.isFormVisibleForm = false;
    } else {
      data.userId = localStorage.getItem('id') ? localStorage.getItem('id'): '';
      this.applicationService.createApplication(data).subscribe((res) => {
        this.isFormVisibleForm = true;
        this.getUserListAndCount(this.commonAttribute.limit, this.commonAttribute.skip);
        this.toastr.success(res.message);
      }, (error) => {
        this.toastr.error(error);
      });
    }
  }
 
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    window.scrollTo(0, 0);// for top scroll
    this.getApplicationList(this.commonAttribute.limit, startItem);
  }

  showApplicationData(application?: Application) {
    this.isDisable = true;
    this.courseFormData = application;
  }

  editApplicationData(application: Application, index: number) {
    this.isEditable = true;
    this.courseFormData = application;
    this.commonAttribute.currentIndex = index;
    this.commonAttribute.currentId = application._id;
  }

  updateApplication(updateData: Partial<Application>): void {
    if (_.isEmpty(updateData)) {
      this.isEditable = false;
    } else {
      this.applicationService.updateApplicationById(this.commonAttribute.currentId, updateData).subscribe((res) => {
        this.applicationList[ this.commonAttribute.currentIndex].status= updateData.status;
        this.toastr.success(res.message);
      }, (error) => {
        this.toastr.error(error);
      });
    }
  }

  actionSelected(event: Event, id: string, index: number, template: TemplateRef<any>): void {
    const target = event.target as HTMLInputElement;
    this.commonAttribute.actionStatus = +target.value;
    this.commonAttribute.currentIndex = index;
    this.commonAttribute.currentId = id;
    this.modalRef = this.modalService.show(template);
  }

  getUserListAndCount(limit: number, skip: number) {
    forkJoin([
      this.getApplicationList(limit, skip),
      this.getApplicationListCount()
    ]);
  }

  getApplicationListCount() {
    const queryObj: any = {};
    if (this.role === UserRoles.USER) {
      queryObj.userId = localStorage.getItem('id') ? localStorage.getItem('id'): '';
    }
    this.applicationService.getApplicationListCount(queryObj).subscribe((res) => {
      this.commonAttribute.applicationListCount = res.data || 0;
    },(error) => {
      this.toastr.error(error);
    });
  }

  getApplicationList(limit: number, skip: number) {
    const queryObj: any = {
      limit, skip
    };
    if (this.role === UserRoles.USER) {
      queryObj.userId = localStorage.getItem('id') ? localStorage.getItem('id'): '';
    }
    this.applicationService.getApplicationList(queryObj).subscribe((res) => {
      this.applicationList = res.data;
    },(error) => {
      this.toastr.error(error);
    });
  }

  dismissCommentBox(): void {
    if(!this.commentData) {
      this.isSubmitted = true;
      return;
    }
    const updateData = {
      status: this.commonAttribute.actionStatus,
      commentData: this.commentData
    };
    this.isSubmitted = false;
    this.updateApplication(updateData);
    this.modalRef.hide();
  }

  showComment(index: number) {
    this.commonAttribute.activeIndex = index;
    this.isVisibleCommentBox = !this.isVisibleCommentBox;
  }
}

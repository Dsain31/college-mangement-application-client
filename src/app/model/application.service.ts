import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from '../global/service/common.service';
import { AjaxResponse } from '../interfaces/ajax-response/ajax.-response';
import { Application } from '../interfaces/applicaiton/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  createApplication(queryObj: any): Observable<AjaxResponse<Application[]>> {
    return this.http.post<AjaxResponse<Application[]>>(this.apiUrl + '/application', queryObj)
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }

  updateApplicationById(id: string, updateData: any): Observable<AjaxResponse<string>> {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http.put<AjaxResponse<string>>(this.apiUrl + '/application/update', updateData, { params })
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }

  getApplicationList(queryObj: any): Observable<AjaxResponse<Application[]>> {
    const params: HttpParams = new HttpParams()
      .set('userId', queryObj.userId)
      .set('limit', queryObj.limit)
      .set('skip', queryObj.skip)
      .set('status', queryObj.status);
    return this.http.get<AjaxResponse<Application[]>>(this.apiUrl + '/application/get-application-list', { params })
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }

  getApplicationListCount(queryObj: any): Observable<AjaxResponse<any>> {
    const params: HttpParams = new HttpParams()
      .set('status', queryObj.status)
      .set('userId', queryObj.userId)
    return this.http.get<AjaxResponse<any>>(this.apiUrl + '/application/get-application-count', { params })
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }

}

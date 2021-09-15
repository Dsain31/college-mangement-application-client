import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/global/service/common.service';
import { AjaxResponse } from 'src/app/interfaces/ajax-response/ajax.-response';
import { User } from 'src/app/interfaces/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  getUserList(queryObj: any): Observable<AjaxResponse<User[]>> {
    const params: HttpParams = new HttpParams()
      .set('role', queryObj.role)
      .set('limit', queryObj.limit)
      .set('skip', queryObj.skip)
      .set('status', queryObj.status);
    return this.http.get<AjaxResponse<User[]>>(this.apiUrl + '/user/user-list', { params })
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }

  getUserListCount(queryObj: any): Observable<AjaxResponse<User[]>> {
    const params: HttpParams = new HttpParams()
      .set('role', queryObj.role)
      .set('status', queryObj.status);
    return this.http.get<AjaxResponse<User[]>>(this.apiUrl + '/user/user-list-count', { params })
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }

  updateUserById(id: string, updateData: any): Observable<AjaxResponse<string>> {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http.put<AjaxResponse<string>>(this.apiUrl + '/user/update',updateData, { params })
      .pipe(
        catchError(this.commonService.handleError) // then handle the error
      );
  }
}

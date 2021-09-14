import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user/user';
import { CommonService } from 'src/app/global/service/common.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AjaxResponse } from 'src/app/interfaces/ajax-response/ajax.-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  loginUser(queryObj: User): Observable<AjaxResponse<User>>{
    return this.http.post<AjaxResponse<User>>(this.apiUrl + '/user/login', queryObj)
    .pipe(
      catchError(this.commonService.handleError) // then handle the error
    );
  }
}

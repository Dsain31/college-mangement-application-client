import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError  } from 'rxjs/operators';
import { CommonService } from 'src/app/global/service/common.service';
import { Observable } from 'rxjs';
import {AjaxResponse} from '../../interfaces/ajax-response/ajax.-response'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  registerUser(queryObj): Observable<AjaxResponse<never>>{
    return this.http.post<AjaxResponse<never>>(this.apiUrl + '/user', queryObj)
    .pipe(
      catchError(this.commonService.handleError) // then handle the error
    );
  }
}


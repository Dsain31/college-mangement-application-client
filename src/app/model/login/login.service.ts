import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user/user';
import { CommonService } from 'src/app/global/service/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  loginUser(queryObj: User){
    return this.http.post(this.apiUrl + '/user/login', queryObj)
    .pipe(
      catchError(this.commonService.handleError) // then handle the error
    );
  }
}

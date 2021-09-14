import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError  } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/service/common.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  registerUser(queryObj){
    return this.http.post(this.apiUrl + '/user', queryObj)
    .pipe(
      catchError(this.commonService.handleError) // then handle the error
    );
  }
}


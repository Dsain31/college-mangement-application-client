import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return  (error.error) ? throwError(error.error) : throwError('Something bad happened; please try again later.');
}
}

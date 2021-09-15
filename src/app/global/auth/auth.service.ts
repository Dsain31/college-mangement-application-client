/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


Injectable({
    providedIn: 'root'
});
export class AuthService {
    public subject = new BehaviorSubject<boolean>(false);
    public user$ = this.subject.asObservable();

    async isLogIn(value: boolean) {
        await this.subject.next(value);
    }
}

/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userData } from '../modules/login/login';


Injectable({
    providedIn: 'root'
});
export class AuthService {
    public subject = new BehaviorSubject<typeof userData>(userData);
    public user$: Observable<typeof userData> = this.subject.asObservable();

    isLogIn(value: string) {
        this.subject.next({_id: value});
    }
}

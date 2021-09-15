/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userData } from '../model/common/common.model';


Injectable({
    providedIn: 'root'
});
export class AuthService {
    public subject = new BehaviorSubject<typeof userData>(userData);
    public user$: Observable<typeof userData> = this.subject.asObservable();

    async isLogIn(value: string) {
        await this.subject.next({_id: value});
    }
}

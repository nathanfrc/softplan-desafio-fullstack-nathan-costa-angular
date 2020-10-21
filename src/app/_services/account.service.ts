import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';


import { HttpUtilService } from './http-util.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private httpUtil: HttpUtilService

    public usuarios:any;

    constructor(
        private router: Router,
        private http: HttpClient
       
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();

        this.httpUtil = new HttpUtilService;
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, senha) {
        return this.http.post<User>(`${environment.apiUrl}/auth`, { email, senha})
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user.token));
                localStorage.setItem('email', JSON.stringify(user.email));
                this.userSubject.next(user);
                console.log("fazendo login");
                console.log(user);
                return user;
            }));
    }

    logout() {

        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }


    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/usuario`, user,this.httpUtil.headers());
    }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/api/usuario`,this.httpUtil.headers());
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/usuario/${id}`,this.httpUtil.headers());
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/api/usuario/${id}`, params)
            .pipe(map(x => {
                if (id == this.userValue.id) {
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/usuario/${id}`,this.httpUtil.headers())
            .pipe(map(x => {
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
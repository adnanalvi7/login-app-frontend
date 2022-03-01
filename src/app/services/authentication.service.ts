import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { ToastrService, ActiveToast } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public loginUserSubject: BehaviorSubject<any>;
    public loginUser: Observable<any>;
    private tokenSubject: BehaviorSubject<any>;

    
    constructor(
        private http: HttpClient,
        private router: Router,
        private _toaster: ToastrService,

    ) {
        this.loginUserSubject = new BehaviorSubject<any>(localStorage.getItem('loginUser'));
        this.loginUser = this.loginUserSubject.asObservable();
        this.tokenSubject = new BehaviorSubject<any>(localStorage.getItem('access_token'));
    }

   

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}users/login`, { email, password })
            .pipe(map(result => {
                if (result.user) {
                    localStorage.setItem('loginUser', JSON.stringify(result.user));
                    this.loginUserSubject.next(result.user);
                }
                return result;
            }));
    }



    signup(payload: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}users/create`, payload)
            .pipe(map(result => {
                return result;
            }));

    }
    activateAccount(payload: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}users/confirm-account`, payload)
            .pipe(map(result => {
                return result;
            }));

    }
    public get loginUserValue(): any {
        if (this.loginUserSubject.value) {
            return this.loginUserSubject.value
        }
        return;
    }

    // emailValidation(username: string): Observable<any> {
    //     return this.http.get<any>(`${environment.apiUrl}forget?r=site/request-password-reset&email=${username}`);
    // }
    // resetPassword(password: string, token: any): Observable<any> {
    //     return this.http.get<any>(`${environment.apiUrl}reset?r=site/reset-password&token=${token}&pass=${password}`);
    // }

    logout(): void {
        localStorage.clear();
        this.loginUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    
    errorMessage(message: any, title: any): ActiveToast<any> {
        return this._toaster.error(message, title, {
            timeOut: 2000,
            easing: 'ease-in',
            progressBar: true,
            progressAnimation: 'decreasing',
            tapToDismiss: true,
        });
    }
    successMessage(message: any, title: any): ActiveToast<any> {
        return this._toaster.success(message, title, {
            timeOut: 2000,
            easing: 'ease-in',
            progressBar: true,
            progressAnimation: 'decreasing',
            tapToDismiss: true,
        });
    }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, retry} from 'rxjs/operators';
import {CurrentUser, GetToken} from '../model/current-user/current-user';
import {DomSanitizer} from '@angular/platform-browser';
import { environment } from '../../environments/environment';

const saharUrl = environment.baseApi + '/saharApi';
const autUrl = environment.baseApi + '/saharAuth';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
    this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('currentUser') as string);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // get token
  getToken(data: any): Observable<GetToken> {
    return this.http.post<GetToken>(autUrl + '/getToken', data, httpOptions)
      .pipe(
        retry(1)
      );
  }

  login(data: any): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(autUrl + '/login', data, httpOptions)
      .pipe(map(user => {
       if (user.state) {
         user.user.token = user.msg;
         const userData = user.user;
         const companyData = {companies: user.companies};
         sessionStorage.setItem('currentUser', JSON.stringify(userData));
         sessionStorage.setItem('companies', JSON.stringify(companyData));
         this.currentUserSubject.next(user);
       }
       return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('companies');
    sessionStorage.removeItem('menu');
    if (sessionStorage.getItem('filters')) {
      sessionStorage.removeItem('filters');
    }
    if (sessionStorage.getItem('lastAud')) {
      sessionStorage.removeItem('lastAud');
    }
    if (sessionStorage.getItem('lastFirm')) {
      sessionStorage.removeItem('lastFirm');
    }
    this.currentUserSubject.next(null);
  }

  loaginUrl(data: any): Observable<any> {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('companies');
    sessionStorage.removeItem('menu');
    return this.http.post<CurrentUser>(autUrl + '/TokenLogin', data, httpOptions)
      .pipe(map(user => {
        if (user.state) {
          const userData = {
            token: user.msg,
            user : user.user,
          };
          const companyData = {companies: user.companies};
          sessionStorage.setItem('currentUser', JSON.stringify(userData));
          sessionStorage.setItem('companies', JSON.stringify(companyData));
          this.currentUserSubject.next(user);
        }
        return user;
      }));

  }

  getMessages(): Observable<any> {
    return this.http.get<CurrentUser>(saharUrl + '/messages');
  }

}



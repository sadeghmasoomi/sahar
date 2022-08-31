import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
const url = environment.baseApi + '/saharApi/';
@Injectable({
  providedIn: 'root'
})
export class InformatiomService {
  companyCode: string = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
  private httpOption: any = {
    headers: {
      authorization: JSON.parse(sessionStorage.getItem('currentUser') as string).token
    }
  };
  constructor(private http: HttpClient) { }

  apiMakerPost(data: any, name: string): Observable<any> {
    return this.http.post<any>(url + name, data, this.httpOption)
      .pipe(
        catchError(this.handleError('getJam', data))
      );
  }

  // error handling
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string): void {
  }
}

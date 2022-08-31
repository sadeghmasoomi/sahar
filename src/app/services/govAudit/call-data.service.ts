import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
const url = environment.baseApi + '/saharApi';
@Injectable({
  providedIn: 'root'
})
export class CallDataService {

  private httpOption: any = {
    headers: {
      authorization: JSON.parse(sessionStorage.getItem('currentUser') as string).token
    }
  };

  constructor(private http: HttpClient) { }

  getGovData(data: any): Observable<any> {
    return this.http.post<any>(url + '/getGovData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getGovData', data))
      );
  }

  insureAcceptUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/InsureAcceptUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('InsureAcceptUpdate', data))
      );
  }

  FirmInfoScoringUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/FirmInfoScoringUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('FirmInfoScoringUpdate', data))
      );
  }

  CoInfoUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/CoInfoUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('CoInfoUpdate', data))
      );
  }

  GovFrimInfoUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/GovFrimInfoUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('GovFrimInfoUpdate', data))
      );
  }

  CoInfoForm(): Observable<any> {
    return this.http.post<any>(url + '/CoInfoForm', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('CoInfoForm', {}))
      );
  }

  getGovFrimInfoForm(): Observable<any> {
    return this.http.post<any>(url + '/getGovFrimInfoForm', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getGovFrimInfoForm', {}))
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
    // console.log(message);
  }
}

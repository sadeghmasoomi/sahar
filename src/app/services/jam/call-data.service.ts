import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
const url = environment.baseApi + '/saharApi';
// http header Options

@Injectable({
  providedIn: 'root'
})
export class CallDataService {
  companyCode: string = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
  private httpOption: any = {
    headers: {
      authorization: JSON.parse(sessionStorage.getItem('currentUser') as string).token
    }
  };

  constructor(private http: HttpClient) {}

  // getFirmContract
  getJam(data: any): Observable<any> {
    return this.http.post<any>(url + '/getJam', data, this.httpOption)
      .pipe(
        catchError(this.handleError('getJam', data))
      );
  }

  getDescription(data: any): Observable<any> {
    return this.http.post<any>(url + '/Description', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('Description', data))
      );
  }

  getJamDescription(data: any): Observable<any> {
    return this.http.post<any>(url + '/JamDescription', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('JamDescription', data))
      );
  }

  operationsBalanceSheet(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/balanceSheet', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('balanceSheet', data))
      );
  }


  operationsProfitandLossStatement(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/ProfitandLossStatement', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('ProfitandLossStatement', data))
      );
  }

  operationsCashFlow(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/CashFlow', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('CashFlow', data))
      );
  }

  operationsRestInformatio(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/OtherInformation', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('OtherInformation', data))
      );
  }

  operationShareholder(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/ShareHolders', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('ShareHolders', data))
      );
  }

  operationTransAffiliates(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/TransAffiliates', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('TransAffiliates', data))
      );
  }

  operationMemberRelation(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/MemberRelation', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('MemberRelation', data))
      );
  }

  confirmContract(data: any): Observable<any> {
    data.FirminfoGcode = this.companyCode;
    return this.http.post<any>(url + '/confirmContract', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('confirmContract', data))
      );
  }

  getNews(): Observable<any> {
    return this.http.get<any>(url + '/news', this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getTicketing'))
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

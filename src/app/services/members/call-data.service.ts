import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const url = environment.baseApi + '/member';
const saharApi = environment.baseApi + '/saharApi';


@Injectable({
  providedIn: 'root'
})
export class CallDataMembersService {
  private httpOption: any = {
    headers: {
      authorization: JSON.parse(sessionStorage.getItem('currentUser') as string).token
    }
  };

  constructor(private http: HttpClient) { }

  getSaharMembers(data: any): Observable<any> {
    return this.http.post<any>(url + '/getMembers', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getMembers', data))
      );
  }

  getMemberData(data: any): Observable<any> {
    return this.http.post<any>(url + '/getMemberData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getMemberData', data))
      );
  }

  getFirms(data: any = {}): Observable<any> {
    return this.http.post<any>(url + '/getFirms', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirms', data))
      );
  }

  getFirmsData(data: any): Observable<any> {
    return this.http.post<any>(url + '/getFirmsData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmsData', data))
      );
  }

  getFirmsUserData(data: any): Observable<any> {
    return this.http.post<any>(url + '/getFirmsUserData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmsUserData', data))
      );
  }

  getCheckUserData(data: any): Observable<any> {
    return this.http.post<any>(saharApi + '/checkUserData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('checkUserData', data))
      );
  }

  AddUserToFirmForm(data: any = {}): Observable<any> {
    return this.http.post<any>(url + '/AddUserToFirmForm', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('AddUserToFirmForm', data))
      );
  }

  UserFirmFlowUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/UserFirmFlowUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserFirmFlowUpdate', data))
      );
  }

  userFirmsForm(data: any = {}): Observable<any> {
    return this.http.post<any>(url + '/userFirmsForm', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('userFirmsForm', data))
      );
  }

  getAddFirmForm(): Observable<any> {
    return this.http.post<any>(url + '/getAddFirmForm', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmsData', {}))
      );
  }

  UsersUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/UsersUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UsersUpdate', {}))
      );
  }

  UserGroupRankFlowUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/UserGroupRankFlowUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserGroupRankFlowUpdate', {}))
      );
  }

  getMemberForm(): Observable<any> {
    return this.http.post<any>(url + '/getMemberForm', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getMemberForm', {}))
      );
  }

  sendFirmAction(data: any): Observable<any> {
    return this.http.post<any>(url + '/FirmAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('FirmAction', data))
      );
  }

  sendMemberAction(data: any): Observable<any> {
    return this.http.post<any>(url + '/MemberAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('MemberAction', data))
      );
  }

  memberFlow(data: any): Observable<any> {
    return this.http.post<any>(url + '/MemberFlow', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('MemberFlow', data))
      );
  }

  firmMemberOperation(data: any): Observable<any> {
    return this.http.post<any>(url + '/firmMemberOperation', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('firmMemberOperation', data))
      );
  }

  firmInfoDtl(data: any): Observable<any> {
    return this.http.post<any>(url + '/FirmInfoDtl', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('FirmInfoDtl', data))
      );
  }

  getFirmDetailsForm(): Observable<any> {
    return this.http.post<any>(url + '/getFirmDetailsForm', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmDetailsForm', {}))
      );
  }

  getFirmMembers(data: any): Observable<any> {
    return this.http.post<any>(url + '/getFirmMembers', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmMembers', data))
      );
  }

  getUserGroupRank(): Observable<any> {
    return this.http.post<any>(url + '/getUserGroupRank', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getUserGroupRank', {}))
      );
  }

  getUserGroupFirmRank(): Observable<any> {
    return this.http.post<any>(url + '/getUserGroupFirmRank', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getUserGroupFirmRank', {}))
      );
  }

  getUser(data: any): Observable<any> {
    return this.http.post<any>(url + '/getUser', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getUser', {}))
      );
  }

  UserDetails(data= {}): Observable<any> {
    return this.http.post<any>(url + '/UserDetails', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserDetails', data))
      );
  }

  UserImages(data= {}): Observable<any> {
    return this.http.post<any>(url + '/UserImages', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserImages', data))
      );
  }

  UserEducation(data?: any): Observable<any> {
    return this.http.post<any>(url + '/UserEducation', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserEducation', data))
      );
  }

  UserInfoLanguage(data= {}): Observable<any> {
    return this.http.post<any>(url + '/UserInfoLanguage', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserInfoLanguage', data))
      );
  }

  UserInfoResume(data= {}): Observable<any> {
    return this.http.post<any>(url + '/UserInfoResume', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserInfoResume', data))
      );
  }

  getAllUsers(data: any): Observable<any> {
    return this.http.post<any>(url + '/getAllUsers', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getAllUsers', data))
      );
  }

  getDescription(data: any): Observable<any> {
    return this.http.post<any>('https://sahar.iacpa.ir/saharApi/Description', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('Description', data))
      );
  }

  UserInfoUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/UserInfoUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserInfoUpdate', data))
      );
  }

  userEducationUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/userEducationUpdate', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('userEducationUpdate', data))
        );
  }

  UserInfoImageUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/UserInfoImageUpdate', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('UserInfoImageUpdate', data))
        );
  }

  UserInfoResumeUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/UserInfoResumeUpdate', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('UserInfoResumeUpdate', data))
        );
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myWorkbook: XLSX.WorkBook = { Sheets: { data: myWorksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myWorkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
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

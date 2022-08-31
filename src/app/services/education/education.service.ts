import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
const url = environment.baseApi + '/saharApi';
@Injectable({
  providedIn: 'root'
})
export class EducationService {
  companyCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
  private httpOption: any = {
    headers: {
      authorization : JSON.parse(sessionStorage.getItem('currentUser') as string).token
    }
  };
  constructor(private http: HttpClient) { }

  getInstallment(data: any): Observable<any> {
    return this.http.post(url + '/getInstallment', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getInstallment', data))
      );
  }

  optionInstallment(data: any): Observable<any> {
    return this.http.post(url + '/installmentAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('installmentAction', data))
      );
  }

  getCourses(data: any): Observable<any> {
    return this.http.post(url + '/getCourses', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getCourses', data))
      );
  }

  getCoursesPrograms(data: any): Observable<any> {
    return this.http.post(url + '/getCoursesPrograms', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getCoursesPrograms', data))
      );
  }

  getProgramAccess(data: any): Observable<any> {
    return this.http.post(url + '/getProgramAccess', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getProgramAccess', data))
      );
  }

  courseAction(data: any): Observable<any> {
    return this.http.post(url + '/courseAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('courseAction', data))
      );
  }

  coursesProgramAction(data: any): Observable<any> {
    return this.http.post(url + '/coursesProgramAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('coursesProgramAction', data))
      );
  }

  trainProgramAccessAction(data: any): Observable<any> {
    return this.http.post(url + '/trainProgramAccessAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('trainProgramAccessAction', data))
      );
  }

  getTeachers(data: any): Observable<any> {
    return this.http.post(url + '/getTeachers', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getTeachers', data))
      );
  }

  getAddress(data: any): Observable<any> {
    return this.http.post(url + '/getAddresses', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getAddresses', data))
      );
  }

  getLesion(data: any): Observable<any> {
    return this.http.post(url + '/getLesson', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getLesion', data))
      );
  }

  getAllAddresses(): Observable<any> {
    return this.http.post(url + '/getAllAddresses', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getAllAddresses', {}))
      );
  }

  getFormCities(): Observable<any> {
    return this.http.post(url + '/getFormCities', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFormCities', {}))
      );
  }

  TrainAddressAction(data: any): Observable<any> {
    return this.http.post(url + '/TrainAddressAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('TrainAddressAction', data))
      );
  }

  getAllLesson(): Observable<any> {
    return this.http.post(url + '/getAllLesson', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getAllLesson', {}))
      );
  }

  trainLessonAction(data: any): Observable<any> {
    return this.http.post(url + '/TrainLessonAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('TrainLessonAction', data))
      );
  }

  trainProgAccessAddressUpdate(data: any): Observable<any> {
    return this.http.post(url + '/TrainProgAccessAddressUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('TrainProgAccessAddressUpdate', data))
      );
  }

  TrainProgAccessLessonAction(data: any): Observable<any> {
    return this.http.post(url + '/TrainProgAccessLessonAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('TrainProgAccessLessonAction', data))
      );
  }

  RegisteredCourses(): Observable<any> {
    return this.http.post(url + '/RegisteredCourses', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('RegisteredCourses', {}))
      );
  }

  getUserCourses(): Observable<any> {
    return this.http.post(url + '/getUserCourses', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getUserCourses', {}))
      );
  }

  UserRegister(data: any): Observable<any> {
    return this.http.post(url + '/UserRegister', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UserRegister', data))
      );
  }

  unPaidCourses(): Observable<any> {
    return this.http.post(url + '/unPaidCourses', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('unPaidCourses',  {}))
      );
  }

  getIntroduction(): Observable<any> {
    const data = {
      LoactionGcode: JSON.parse( sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    return this.http.post(url + '/getIntroduction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getIntroduction',  data))
      );
  }


  usersToIntroduction(data: any): Observable<any> {
    data.LoactionGcode =  JSON.parse( sessionStorage.getItem('menu') as string).FirminfoGcode
    return this.http.post(url + '/usersToIntroduction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('usersToIntroduction',  data))
      );
  }

  introductionActionFun(data: any): Observable<any> {
    return this.http.post(url + '/introductionAction', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('introductionAction',  data))
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

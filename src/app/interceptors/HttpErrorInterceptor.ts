import { catchError, tap } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // console.log(data)
        tap(data => data),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            'Something bad happened; please try again later.');
        })
      );
  }




}

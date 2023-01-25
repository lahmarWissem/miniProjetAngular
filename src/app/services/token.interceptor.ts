import { SpinnerServiceService } from './../spinner/spinner-service.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private spinnerService :SpinnerServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const g = "/login";
   
    if(request.url.search(g) === -1){
      let jwt = this.authService.getToken();
    let reqWithToken = request.clone( {
    setHeaders: { Authorization : "Bearer "+jwt}
    } )
    this.spinnerService.requestStarted();

    return next.handle(reqWithToken);
    }
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
          }
        },
        error => {
          this.spinnerService.resetSpinner();
          throw error;
        }
      )
    );
  }


  }

 

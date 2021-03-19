import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snack: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modalStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors;
              } else{
                this.snack.open(error.status + " Bad Request", null, {
                  duration: 3000,
                  panelClass: ['mat-warn'],
                });
              }
              break;
            case 401:
              console.log(error);
              this.snack.open(error.status + " Unauthorized", null, {
                duration: 3000,
                panelClass: ['mat-warn'],
              });
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.snack.open("Something unexpected went wrong.", null, {
                duration: 3000,
                panelClass: ['mat-warn'],
              });
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}

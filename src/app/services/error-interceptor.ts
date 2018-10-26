import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public snackBar: MatSnackBar) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {      
        return next.handle(req).pipe(
            catchError((err:HttpErrorResponse) => {
                console.log(err);
                this.snackBar.open(err.error.message, "close", {
                    duration: 3000,
                    panelClass: ['red-snackbar']
                });
                return throwError(err);
            })
        );
    }
}

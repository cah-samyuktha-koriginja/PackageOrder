import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError, TimeoutError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /***************Properties***************/
    logoutUser: boolean;

    private handledSessionExpiration = false;
    /***************Properties***************/

    /***************Constructor***************/
    constructor() { }
    /***************Constructor***************/

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => { }),

            catchError(error => {
                if (this.handledSessionExpiration) {
                    const message = error.error.faultInfos[0].faultMessage;
                    return of(error);
                }

                if (error instanceof HttpErrorResponse && error.error) {
                    let unauthRequest = false;

                        switch (error.status) {
                            case 0:
                                error='Token Expired...';
                                break;
                            case 401:
                                unauthRequest = true;
                                error = 'Your session has timed out.';
                                break;
                            default:
                                error = error.statusText;
                                break;
                       }                       
                }
                return throwError(error);
            })
        );
    }
}




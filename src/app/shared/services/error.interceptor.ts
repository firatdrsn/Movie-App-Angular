import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((response: HttpErrorResponse) => {
                let errorMessage = "Error occurred";
                if (!navigator.onLine) {
                    errorMessage = "Connection error"
                } else if (response.error.error) {
                    if (response.status === 401) {
                        errorMessage = "You are not authorized"
                    } else {
                        switch (response.error.error.message) {
                            case "EMAIL_EXISTS":
                                errorMessage = "Email in use";
                                break;
                            case "EMAIL_NOT_FOUND":
                                errorMessage = "Email not found";
                                break;
                            case "INVALID_PASSWORD":
                                errorMessage = "Invalid password";
                        }
                    }
                }
                const error = new Error(errorMessage);
                return throwError(() => error);
            })
        );
    }
}
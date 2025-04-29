import {HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService: AuthService = inject(AuthService);
const router: Router = inject(Router);
const jwtHelper = inject(JwtHelperService);
const token = authService.getToken();
let request = req;

if(!token || jwtHelper.isTokenExpired(token) ) {
  request = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}


  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
        router.navigate(
          ['/login'],
          { queryParams: { returnUrl: req.url } }
        );
      }
      return throwError(() => err);
    })
  );
};

import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {inject} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);
  const token = authService.getToken();
  const jwtHelper = inject(JwtHelperService);

  if(!token || jwtHelper.isTokenExpired(token) ) {
    return router.createUrlTree(
      ['/login'],
      { queryParams: { returnUrl: state.url } }
    );
  }
    return true;
};

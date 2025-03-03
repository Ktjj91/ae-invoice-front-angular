import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

const auth:AuthService = inject(AuthService);
const token = auth.token;

if(!token){
  return  next(req);
}

const headers = new HttpHeaders({
    Authorization:`Bearer ${token}`
  })

const newReq = req.clone({
  headers
})


  return next(newReq);
};

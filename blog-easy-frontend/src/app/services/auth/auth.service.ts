import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenInterface} from '../../interfaces/token';
import {Credentials} from '../../interfaces/credentials';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  API_URL = `${environment.apiAuthUrl}`;
  token:string | null = sessionStorage.getItem('token');

  login(credentials:Credentials): Observable<TokenInterface>{
    return this.http.post<TokenInterface>(this.API_URL,credentials);
  }

  setToken(token:string):void{
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  clearToken(): void {
    this.token = null;
    sessionStorage.removeItem('token');
  }

}

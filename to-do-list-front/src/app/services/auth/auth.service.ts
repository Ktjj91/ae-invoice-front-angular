import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Credentials} from '../../intefaces/credentials/credentials';
import {Token} from '../../intefaces/token/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private  readonly TOKEN_KEY = "token"
  login(credentials:Credentials) :Observable<Token> {
    return this.httpClient.post<Token>('https://localhost:8000/api/login_check',credentials).pipe(
      tap(token => {
        localStorage.setItem(this.TOKEN_KEY,token.token)
      })
    )
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

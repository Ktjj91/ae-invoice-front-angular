import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Articles} from '../../interfaces/articles';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private  readonly  http: HttpClient = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/articles`;



  getArticles(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.API_URL);
  }

  getArticleById(id: number): Observable<Articles> {
    return this.http.get<Articles>(`${this.API_URL}/${id}`);
  }

  createArticle( article:Articles ): Observable<Articles> {
    return this.http.post<Articles>(this.API_URL, article);
  }

  updateArticle(id:number,article:Articles): Observable<Articles> {
    return this.http.patch<Articles>(`${this.API_URL}/${id}`,article)
  }

  deleteArticle(id:number): Observable<Articles> {
    return this.http.delete<Articles>(`${this.API_URL}/${id}`);
  }



}

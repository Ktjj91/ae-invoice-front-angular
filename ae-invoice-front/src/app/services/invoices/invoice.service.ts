import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly apiUrl = `${environment.apiUrl}/invoices`;
  private readonly http:HttpClient = inject(HttpClient);
  private headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });







}

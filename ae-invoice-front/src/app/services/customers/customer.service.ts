  import {inject, Injectable} from '@angular/core';
  import {environment} from '../../../environments/environment';
  import {HttpClient, HttpHeaders} from '@angular/common/http';
  import {Customer} from '../../interfaces/customer';
  import {Observable} from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerService {
    private apiUrl = `${environment.apiUrl}/customers`;
    private readonly http:HttpClient = inject(HttpClient);
    private headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });


    getCustomers():Observable<Customer[]> {
      return this.http.get<Customer[]>(this.apiUrl);
    }

    getCustomer(id:number):Observable<Customer> {
      return this.http.get<Customer>(`${this.apiUrl}/${id}`);
    }

    addCustomer(customer : Customer): Observable<Customer>{
      return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(id:number, customer : Customer): Observable<Customer>{
      return this.http.patch<Customer>(`${this.apiUrl}/${id}`, customer,{headers: this.headers});
  }

  deleteCustomer(id:number):Observable<Customer>{
      return this.http.delete<Customer>(`${this.apiUrl}/${id}`);
  }


  }

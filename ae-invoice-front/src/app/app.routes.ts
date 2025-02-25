import { Routes } from '@angular/router';
import {CustomerComponent} from './components/customer/customer.component';
import {SinglecustomerComponent} from './components/singlecustomer/singlecustomer.component';

export const routes: Routes = [
  {path: 'customers', component: CustomerComponent},
  {path: 'customer/:id', component: SinglecustomerComponent},
];

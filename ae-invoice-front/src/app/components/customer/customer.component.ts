import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CustomerService} from '../../services/customers/customer.service';
import {Customer} from '../../interfaces/customer';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ConfirmationService} from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {RouterLink} from '@angular/router';

@Component({
selector: 'app-customer',
  imports: [TableModule, ButtonModule, ConfirmPopupModule, ConfirmDialog, RouterLink],
templateUrl: './customer.component.html',
styleUrl: './customer.component.css',
  providers:[ConfirmationService]
})
export class CustomerComponent implements OnInit {
private readonly customerService: CustomerService = inject(CustomerService);
private readonly confirmationSerivce: ConfirmationService = inject(ConfirmationService);
customers:WritableSignal<Customer[]> = signal([]);

ngOnInit(): void {
  this.loadCustomers();
}

loadCustomers(): void {
   this.customerService.getCustomers().subscribe(c => {
     this.customers.set(c)
  })
}

deleteCustomer(id:number) {

  this.confirmationSerivce.confirm({
    message:`Etes vous sur de supprimer le client ? `,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.customerService.deleteCustomer(id).subscribe(_ => {
        this.loadCustomers();
      })
    },
  })
}

}

import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../../interfaces/customer';
import {CustomerService} from '../../services/customers/customer.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-singlecustomer',
  imports: [InputTextModule, FloatLabel, ReactiveFormsModule, Button],
  templateUrl: './singlecustomer.component.html',
  styleUrl: './singlecustomer.component.css'
})
export class SinglecustomerComponent implements OnInit {

private readonly router : ActivatedRoute = inject(ActivatedRoute);
 readonly customer: WritableSignal<Customer | null>  = signal(null);
private readonly customerService: CustomerService = inject(CustomerService);
private  readonly customerId = Number(this.router.snapshot.paramMap.get('id'));

readonly form: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  fname: new FormControl('', Validators.required),
  compagny: new FormControl('', Validators.required),
  adress: new FormControl('', Validators.required),
  email: new FormControl('', Validators.required),
  siret: new FormControl('', Validators.required),
  tvaIntracom: new FormControl('', Validators.required),

})

  constructor() {
    effect(() => {
      this.form.patchValue({
        name: this.customer()?.name,
        fname: this.customer()?.fname,
        compagny: this.customer()?.company,
        adress: this.customer()?.adress,
        email: this.customer()?.email,
        siret: this.customer()?.siret,
        tvaIntracom: this.customer()?.tvaIntracom,
      })
    });
  }

  ngOnInit(): void {
  this.loadCustomer()


  }

  loadCustomer(){
  this.customerService.getCustomer(this.customerId).subscribe(customer => {
    this.customer.set(customer);
    console.log(this.customer());
  })




  }









}

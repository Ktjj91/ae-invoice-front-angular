import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../../interfaces/customer';
import {CustomerService} from '../../services/customers/customer.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import { ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-singlecustomer',
  imports: [InputTextModule, FloatLabel, ReactiveFormsModule, ButtonDirective],
  templateUrl: './singlecustomer.component.html',
  styleUrl: './singlecustomer.component.css'
})
export class SinglecustomerComponent implements OnInit {

private readonly route : ActivatedRoute = inject(ActivatedRoute);
private readonly  router: Router = inject(Router);
 readonly customer: WritableSignal<Customer | null>  = signal(null);
private readonly customerService: CustomerService = inject(CustomerService);
private  readonly customerId = Number(this.route.snapshot.paramMap.get('id'));

readonly form: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  fname: new FormControl(''),
  compagny: new FormControl('', Validators.required),
  address: new FormControl('', Validators.required),
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
        address: this.customer()?.address,
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
    console.log(customer.address);
    this.customer.set(customer);
  })
  }


  get customName(){
    return this.form.get('name') as FormControl;
  }

  get customFname(){

  return this.form.get('fname') as FormControl;
  }

  get customCompany(){
  return this.form.get('compagny') as FormControl;
  }

  get customAdress(){
  return this.form.get('address') as FormControl;
  }

  get customEmail(){
  return this.form.get('email') as FormControl;
  }

  get customSiret(){
  return this.form.get('siret') as FormControl;
  }
  get customTvaIntracom(){
  return this.form.get('tvaIntracom') as FormControl;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const customer: Customer = {
      id: this.customerId,
      name: this.customName.value,
      fname: this.customFname.value,
      company: this.customCompany.value,
      address: this.customAdress.value,
      email: this.customEmail.value,
      siret: this.customSiret.value,
      tvaIntracom: this.customTvaIntracom.value
    };

    this.customerService.updateCustomer(this.customerId, customer).subscribe(_ => {
      this.router.navigate(['/customers']);


    })

  }

}

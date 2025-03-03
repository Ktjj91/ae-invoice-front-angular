import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from '../../interfaces/credentials';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);

  form = new FormGroup({
    email:new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.min(3)])

  })


  get email(){
    return this.form.get('email') as FormControl;
  }

  get password(){
    return this.form.get('password') as FormControl;
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    const credentials : Credentials = {
      email:this.email.value,
      password: this.password.value
    }

    this.authService.login(credentials).subscribe({
      next: (t)=>{
        this.authService.setToken(t.token);
        this.router.navigate(['/articles']);
      },
      error: (err)=>{
          console.log(err);
      }
    })

  }



}

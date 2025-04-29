import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from '../../intefaces/credentials/credentials';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private formBuilder: FormBuilder = inject(FormBuilder)
  private  readonly authService: AuthService = inject(AuthService);
private readonly router: Router = inject(Router);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  get email(){
    return this.form.controls['email'] as FormControl;
  }
  get password(){
  return this.form.controls['password'] as FormControl;
  }

  onsubmit(){
    if (this.form.invalid) {
      return;
    }
    const credentials: Credentials = {
      email: this.email.value,
      password: this.password.value
    }

    this.authService.login(credentials).subscribe((token) => {
      if (token) {
        this.router.navigate(['/home']);
      }
    })


  }
}

import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../store/actions';
import { RegisterRequestInterface } from '../interfaces/registerRequest.interface';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { selectIsSubmitting } from '../store/reducers';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  store = inject(Store);
  aurhService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);

  onSubmit() {
    console.log(this.form.value);

    const {userName, email, password, firstName, lastName} = this.form.value as {userName: string, email: string, password: string, firstName: string, lastName: string};

    userName.trim();
    email.trim();
    password.trim();

    const request: RegisterRequestInterface = {
      userName,
      email,
      password,
      firstName,
      lastName
    }

    this.store.dispatch(authActions.register({ request }));
    this.aurhService.register(request).subscribe(res => console.log(res));
    this.router.navigate(['/']);
  }

}

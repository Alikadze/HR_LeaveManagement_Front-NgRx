import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../store/actions';
import { RegisterRequestInterface } from '../interfaces/registerRequest.interface';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { AuthService } from '../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from "../../shared/components/backend-error-messages/backend-error-messages.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    BackendErrorMessagesComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  store = inject(Store);
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
   
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  onSubmit() {
    const { userName, email, password, firstName, lastName } = this.form.value as { 
      userName: string, 
      email: string, 
      password: string, 
      firstName: string, 
      lastName: string 
    };
    
    const trimmedUserName = userName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    const request: RegisterRequestInterface = {
      userName: trimmedUserName,
      email: trimmedEmail,
      password: trimmedPassword,
      firstName,
      lastName
    };

    this.store.dispatch(authActions.register({request}));
  }

}

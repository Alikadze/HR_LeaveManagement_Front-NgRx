import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/interfaces/currentUser.inteface';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageServiceService } from '../../shared/services/storage-service.service';
import { BackendErrorMessagesComponent } from '../../shared/components/backend-error-messages/backend-error-messages.component';
import { BackendErrorsInterface } from '../../shared/interfaces/backendErrors.interface';
import { AuthResponseInterface } from '../interfaces/authResponse.interface';
import { Router } from '@angular/router';

export const AuthEffects = createEffect((
  actions = inject(Actions),
  authService = inject(AuthService), 
  storageService = inject(StorageServiceService)
) => {
  return actions.pipe(
    ofType(authActions.register),
    switchMap(({ request }) => {      
      return authService.register(request).pipe(
        map((authResponce : AuthResponseInterface) => {
          // If userId is returned, registration was successful
          if (authResponce.userId) {
            storageService.setItem('userId', authResponce.userId);
            return authActions.registerSuccess({ authResponce });
          }
          
          // Handle the case where userId is not present but no error was caught
          return authActions.registerFailure({ 
            errors: authResponce.errors || { general: ['Unknown error occurred, try again later.'] }
          });
        }),

        catchError((errorResponce: HttpErrorResponse) => {
          // Pass the backend errors directly
          const backendErrors: BackendErrorsInterface = errorResponce?.error?.errors || errorResponce?.error;
          return of(
            authActions.registerFailure({ 
              errors: backendErrors || { general: ['Unknown error occurred, try again later.'] }
            })
          );
        })
      );
    })
  );
}, { functional: true });

export const redirectAfterRegisterEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router)
) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigate(['/']);
      })
    );
  }, { functional: true, dispatch: false }
);

import {createActionGroup, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../interfaces/registerRequest.interface";
import { BackendErrorsInterface } from "../../shared/interfaces/backendErrors.interface";
import { AuthResponseInterface } from "../interfaces/authResponse.interface";

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register : props<{request: RegisterRequestInterface}>(),
    'Register success' : props<{authResponce: AuthResponseInterface}>(),
    'Register failure' : props<{errors: BackendErrorsInterface}>()
  }
});
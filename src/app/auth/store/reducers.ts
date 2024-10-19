import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../interfaces/authState.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {  
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state, 
      isSubmitting: true, 
      validationErrors: null
    })),

    on(authActions.registerSuccess, (state, actions) => ({
      ...state, 
      isSubmitting: false,
      authResponce: actions.authResponce.userId
    })),

    on(authActions.registerFailure, (state, actions) => ({
      ...state, 
      isSubmitting: false, 
      validationErrors: actions.errors
      
    })),
  )
});

export const {
  name: authFeatureKey, 
  reducer: authReducer, 
  selectIsSubmitting ,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors
} = authFeature;

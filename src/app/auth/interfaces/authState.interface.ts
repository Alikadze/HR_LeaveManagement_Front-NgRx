import { BackendErrorsInterface } from "../../shared/interfaces/backendErrors.interface";
import { CurrentUserInterface } from "../../shared/interfaces/currentUser.inteface";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | undefined | null;
  isLoading: boolean | null;
  validationErrors: BackendErrorsInterface | null;
}
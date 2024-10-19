import { BackendErrorsInterface } from "../../shared/interfaces/backendErrors.interface";
import { CurrentUserInterface } from "../../shared/interfaces/currentUser.inteface";

export interface AuthResponseInterface {
  userId: string
  errors: BackendErrorsInterface | null
}
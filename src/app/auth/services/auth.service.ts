import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../interfaces/registerRequest.interface";
import { map, Observable } from "rxjs";
import { CurrentUserInterface } from "../../shared/interfaces/currentUser.inteface";
import { AuthResponseInterface } from "../interfaces/authResponse.interface";
import { environment } from "../../../environments/environment.development";
import { ApiServiceService } from "../../shared/services/api-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiServiceService {

  register(data: RegisterRequestInterface): Observable<AuthResponseInterface> {
    return this.post<AuthResponseInterface>('Account/register', data)
  }
}
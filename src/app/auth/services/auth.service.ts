import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../interfaces/registerRequest.interface";
import { map, Observable } from "rxjs";
import { CurrentUserInterface } from "../../shared/interfaces/currentUser.inteface";
import { AuthResponseInterface } from "../interfaces/authResponse.interface";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url =`${environment.apiUrl}/Account/register`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(response => response.user));
  }
}
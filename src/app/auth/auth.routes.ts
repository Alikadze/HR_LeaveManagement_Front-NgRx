import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";

export const AuthRoutes: Routes = [
  // {
  //   path: '',
  // },
  {
    path: 'register',
    component: RegisterComponent
  }
]
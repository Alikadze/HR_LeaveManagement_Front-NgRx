import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../interfaces/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss'
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrors?: BackendErrorsInterface;

  errorMessages: string[] = [];

  ngOnInit() {
    if (this.backendErrors) {
      this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
        const error = this.backendErrors![name];
  
        if (Array.isArray(error)) {
          return error.join(' \n');
        } else {
          return error ? error : 'Unknown error';
        }
      });
    }
  }
}

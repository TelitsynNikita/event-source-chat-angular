import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages = []
  myForm: FormGroup

  constructor(private builder: FormBuilder) {
    this.myForm = builder.group({
      'message': ['', [Validators.required]]
    })
  }
}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: any = []
  myForm: FormGroup

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.myForm = builder.group({
      'message': ['', [Validators.required]]
    })

    this.onGetMessages()
  }

  onGetMessages() {
    const eventSource = new EventSource('http://localhost:5200/get-messages')
    eventSource.addEventListener('message', message => {
      this.messages = [...this.messages, JSON.parse(message.data)]
    })
  }

  onSendMessage(form: any) {
    this.http.post('http://localhost:5200/new-messages', {
      message: form.value.message
    }).subscribe()
  }
}

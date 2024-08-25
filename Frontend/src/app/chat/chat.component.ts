import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [
    NgClass,
    DatePipe,
    FormsModule,
    NgForOf
  ],
  standalone: true
})
export class ChatComponent {
  chatName: string = 'General Chat';
  members = [
    { name: 'Alice', online: true },
    { name: 'Bob', online: false },
    { name: 'Charlie', online: true },
    { name: 'Dave', online: true },
    { name: 'Eve', online: false },
  ];
  messages = [
    { sender: 'Alice', message: 'Hi everyone!', timestamp: new Date() },
    { sender: 'Bob', message: 'Hello Alice!', timestamp: new Date() },
    { sender: 'You', message: 'Hey folks, what’s up?', timestamp: new Date() },
  ];
  newMessage: string = '';
  currentUser: string = 'You';

  constructor(private router: Router) {}

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        sender: this.currentUser,
        message: this.newMessage,
        timestamp: new Date(),
      };
      this.messages.push(message);
      this.newMessage = '';
    }
  }

  leaveChat(): void {
    this.router.navigate(['/join']);
  }
}

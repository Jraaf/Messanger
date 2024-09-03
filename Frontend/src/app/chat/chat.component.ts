import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AsyncPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChatService} from "../chat.service";
import {sendMessage} from "@microsoft/signalr/dist/esm/Utils";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [
    NgClass,
    DatePipe,
    FormsModule,
    NgForOf,
    AsyncPipe
  ],
  standalone: true
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);
  router = inject(Router);
  messages: any[] = [];
  inputMessage: string = '';
  members: any=[];

  userDisplayName = sessionStorage.getItem("user");
  groupName = sessionStorage.getItem("chatGroup");

  ngOnInit(): void {
    this.chatService.messages_.subscribe((res) => {
      this.messages = res;
      console.log(this.messages);
    });

    this.chatService.activeUsers.subscribe((res) => {
      console.log(res);
    });
  }

  sendChatMessage() {
    this.chatService.sendChatMessage(this.inputMessage)
      .then(() => {
        this.inputMessage = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }
  leaveChat() {
    this.chatService.leaveChat()
      .then(() => {
        this.router.navigate(['']);

        setTimeout(() => {
          location.reload();
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chat")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages_ = new BehaviorSubject<any>([]);
  public activeUsers = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start()
      .then(() => console.log("SignalR connection started"))
      .catch(err => console.error("SignalR connection error: ", err));

    this.connection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {
      // Update the local messages array with the received message and notify subscribers
      this.messages = [...this.messages, { user, message, messageTime }];
      this.messages_.next(this.messages);
    });
    this.connection.on("ConnectedUser", (users: any) => {
      console.log("Connected Users:", users);
      this.activeUsers.next(users);
    });
  }

  public async start(){
    try {
        await this.connection.start();
        console.log("connection started");
    }catch (error){
      console.log(error);
      setTimeout(()=>{
        this.start();
      },5000);
    }
  }
  public async joinGroup(user: string, chatGroup: string) {
    return this.connection.invoke("JoinGroup", { user, chatGroup });
  }

  public async sendChatMessage(message: string) {
    return this.connection.invoke("SendChatMessage", message);
  }

  public async leaveChat(){
    this.connection.stop();
  }
}

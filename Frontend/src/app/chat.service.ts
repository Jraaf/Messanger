import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();
  constructor() { }

  public async start(){
    try {
        await this.connection.start();
    }catch (error){
      console.log(error);
      setTimeout(()=>{
        this.start();
      },5000);
    }
  }
  public async joinRoom(user:string,room:string){
    return this.connection.invoke("JoinSpecificChat",{user:user,room:room});
  }

  public async sendMessage(user:string,room:string){
    return this.connection.invoke("SendMessage",{user:user,room:room});
  }

  public async leave(){
    this.connection.stop();
  }
}

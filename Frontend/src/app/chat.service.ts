import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();

  constructor() {
    this.start();
    this.connection.on(
      "RecieveMessage",
      (user:string,message:string,date:string)=>{
        console.log("user: ", user);
        console.log("message: ", message);
        console.log("time: ", date);
      }
    );
    this.connection.on(
      "ConnectedUser",
      (users:any)=>{
        console.log("users: ", users);
      }
    );
  }

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
    return this.connection.invoke("JoinSpecificChat",{user,room});
  }

  public async sendMessage(message:string){
    return this.connection.invoke("SendMessage",message);
  }

  public async leave(){
    this.connection.stop();
  }
}

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
    this.start()
      .then(() => console.log("SignalR connection started"))
      .catch(err => console.error("SignalR connection error: ", err));

    this.connection.on(
      "ReceiveMessage",
      (user:string,message:string,date:string)=>{
        console.log("user: ", user);
        console.log("message: ", message);
        console.log("time: ", date);
      }
    );
    this.connection.on(
      "ConnectedUsers",
      (users:any)=>{
        console.log("users: ", users);
      }
    );
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
  public async joinRoom(user:string,room:string){
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      await this.connection.start(); // Ensure connection is started
    }
    try {
      return await this.connection.invoke("JoinGroup", { userName: user, chatRoom: room });
    } catch (err) {
      console.error("Error joining room:", err);
      throw err;
    }
  }

  public async sendMessage(message:string){
    return this.connection.invoke("SendMessage",message);
  }

  public async leave(){
    this.connection.stop();
  }
}

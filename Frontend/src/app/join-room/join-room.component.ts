import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent{
  joinRoomForm: FormGroup;
  router = inject(Router);
  chatService = inject(ChatService);

  constructor(private fb: FormBuilder) {
    this.joinRoomForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      chatname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  joinRoom() {

    if (this.joinRoomForm.valid) {
      const { user, chat } = this.joinRoomForm.value;
      this.chatService.joinRoom(user,chat)
        .then(result => {
          console.log('Joining room:', chat, 'as user:', user);
          this.router.navigateByUrl('/chat');})
        .catch((err)=>{
          console.log(err);
        });
    }
  }
}

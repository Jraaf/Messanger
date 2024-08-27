import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ChatService} from "../chat.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {
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
      // Correctly destructure form values
      const { username, chatname } = this.joinRoomForm.value;

      this.chatService.joinRoom(username, chatname)
        .then(result => {
          console.log('Joining room:', chatname, 'as user:', username);
          this.router.navigateByUrl('/chat');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}

import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private fb: FormBuilder) {
    this.joinRoomForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      chatname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  joinRoom() {
    if (this.joinRoomForm.valid) {
      const { username, chatname } = this.joinRoomForm.value;
      console.log('Joining room:', chatname, 'as user:', username);
      this.router.navigateByUrl('/chat');
    }
  }
}

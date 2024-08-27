import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ChatService} from "../chat.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent implements OnInit{
  joinRoomForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);

  constructor() {

  }
  ngOnInit(): void {
    // Initialize the form and define its structure with validation rules
    this.joinRoomForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      chatname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  joinRoom() {
    const { user, chatGroup: chat } = this.joinRoomForm.value;

    // Store user and chatGroup values in sessionStorage for future use
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("chatGroup", chat);

    // Call the joinGroup method from the chat service
    this.chatService.joinGroup(user, chat)
      .then(() => {
        // If the joinGroup operation is successful, navigate to the 'chat' route
        this.router.navigate(['chat']);
      })
      .catch((error) => {
        // If there's an error during the joinGroup operation, log the error
        console.log(error);
      });
  }
}

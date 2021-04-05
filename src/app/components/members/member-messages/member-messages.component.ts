import { Message } from '../../../.models/message';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/.services/message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  @ViewChild('messageForm') messageForm: NgForm;
  messageContent: string;
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    //this.getMessageThread();
  }

  postMessage(){
    this.messageService.sendMessage(this.username, this.messageContent).then(() =>{
     // this.messages.push(message)
      this.messageForm.reset();
    });
  }
}

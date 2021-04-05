import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/.models/message';
import { Pagination } from 'src/app/.models/pagination';
import { MessageService } from '../../.services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = "Unread";
  pageSize = 8;
  pageNumber = 1;
  loading: boolean = false;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.loading=true;
    this.messageService.getAllMessages(this.pageNumber,this.pageSize,this.container).subscribe(resp => {
      console.log(resp);
      this.messages = resp.result;
      this.pagination = resp.pagination;
      this.loading=false;
    })
  }

  pageChanged(event){
    this.pageNumber = event.page;
    this.loadMessages();
  }


}

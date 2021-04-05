import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../.models/pagination';
import { User } from '../.models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserLoggedIn } from '../.models/user-logged-in';
import { map, take } from 'rxjs/operators';
import { Message } from '../.models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl: string = environment.apiUrl;
  hubUrl: string = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();


  constructor(private httpClient: HttpClient) { }

  createHubConnection(user: UserLoggedIn, otherUsername: string){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch(error=>console.log(error));
    this.hubConnection.on('ReceiveMessageThread', messages=>{
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageThreadSource.next([...messages, message])
      })
    })
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }

  async sendMessage(userName: string, content: string){
    return this.hubConnection.invoke('SendMessage', { recipientUsername: userName, messageContent: content})
      .catch(error => console.log(error));
  }

  getAllMessages(pageNumber, pageSize, container){
    let params = this.getPaginationHeader(pageNumber, pageSize);
    params = params.append('Container', container);
    return this.getPaginatedResult<Message[]>(this.baseUrl + 'Messages', params);
  }

  getMessageThread(username: string){
    return this.httpClient.get<Message[]>(this.baseUrl + "Messages/" + username);
  }

  private getPaginatedResult<T>(url, params) {
    console.log(url);
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.httpClient.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getPaginationHeader(pageNumber: number, pageSize: number){
    let params = new HttpParams();
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    return params;
  }
}

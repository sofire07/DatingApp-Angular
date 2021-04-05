import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserLoggedIn} from '../.models/user-logged-in';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();


  constructor(private snack: MatSnackBar, private router: Router) { }

  createHubConnection(user: UserLoggedIn){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection
      .start()
      .catch(error=>console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.snackSuccess(username + ' has connected.');
    })

    this.hubConnection.on('UserisOffline', username =>{
      this.snackSuccess(username + ' has disconnected.');
    })

    this.hubConnection.on('GetOnlineUsers', (usernames: string[])=>{
      this.onlineUsersSource.next(usernames);
    })

    this.hubConnection.on('NewMessageReceived', ({userName, knownAs}) => {
      console.log(userName);
      let snackBarRef = this.snackMessageReceived(knownAs + " has sent you a new message!", userName);
      
    })
  }

  snackSuccess(message: string) {
    let snackBarRef = this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }
  

  snackMessageReceived(message: string, username: string) {
    let snackBarRef = this.snack.open(message, 'View', {
      duration: 3000,
      panelClass: ['mat-primary'],
    });

    snackBarRef.onAction().subscribe(()=>{
      let url = `/members/${username}?tab=3`
      console.log(url);
      this.router.navigateByUrl(url);
    })
  }

  stopHubCOnnection(){
    this.hubConnection.stop().catch(error=>console.log(error));
  }
}

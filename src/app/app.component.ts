import { Component, OnInit } from '@angular/core';
import { User } from './.models/user';
import { UserLoggedIn } from './.models/user-logged-in';
import { AccountService } from './.services/account.service';
import { PresenceService } from './.services/presence.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userLoggedIn: UserLoggedIn;
  constructor(private account: AccountService, private presence: PresenceService) {}

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    this.userLoggedIn = JSON.parse(localStorage.getItem('user'));
    if(this.userLoggedIn){
      this.account.setCurrentUser(this.userLoggedIn);
      this.presence.createHubConnection(this.userLoggedIn);
    }
  }



  
}

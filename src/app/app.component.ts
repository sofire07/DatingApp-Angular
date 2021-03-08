import { Component, OnInit } from '@angular/core';
import { UserService } from '../app/.services/user.service';
import { User } from '../app/.models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: User[];
  constructor(private _userService: UserService) {}

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(res => this.users = res);
  }

  
}

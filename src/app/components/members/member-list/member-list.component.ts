import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/.models/user';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.userService.getUsers().subscribe(x=> this.users = x);
  }

}

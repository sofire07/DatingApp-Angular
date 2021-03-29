import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/.models/pagination';
import { User } from 'src/app/.models/user';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { UserParams } from 'src/app/.models/userParams';
import { AccountService } from 'src/app/.services/account.service';
import { UserService } from 'src/app/.services/user.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberListComponent implements OnInit {
  // users$: Observable<User[]>
  loggedIn: UserLoggedIn;
  users: User[];
  pagination: Pagination;
  userParams: UserParams;
  opened: boolean;


  genderList = [{'value': 'male', 'display': 'Males'}, {'value': 'female', 'display':'Females'}]
  constructor(private userService: UserService,private account: AccountService) {
    this.userParams = this.userService.getUserParams();
   }

  ngOnInit(): void {
    this.loadUsers()
    
  }
  
  resetFilters(){
    this.userParams = this.userService.resetUserParams();
    this.loadUsers();
  }

  loadUsers(){
    this.userService.setUserParams(this.userParams);
    this.userService.getUsers(this.userParams).subscribe(response =>{
      this.users = response.result;
      this.pagination = response.pagination;
    });
  }


  pageChanged(event) {
    this.userParams.CurrentPage = event.page;
    this.userService.setUserParams(this.userParams);
    this.loadUsers();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/.models/user';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // loggedIn: boolean;
  currentUser$: Observable<UserLoggedIn>;
  user: UserLoggedIn;
  constructor(private router: Router, private account: AccountService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser$ = this.account.currentUser$;
    this.currentUser$.subscribe(user=>this.user=user);
  }

  Logout(){
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

}

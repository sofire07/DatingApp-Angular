import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { LoginUser } from '../../.models/login-user'
import { UserLoggedIn } from '../../.models/user-logged-in'
import { AccountService } from '../../.services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser = new LoginUser();
  userLoggedIn: UserLoggedIn;

  constructor(private account: AccountService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  LoginUser(event){
    event.preventDefault();
    this.account.loginUser(this.loginUser).subscribe((res) => this.router.navigateByUrl('/'),
        (error) => {                              
          if(typeof error.error != "string") {
            this.openSnackBar("An error occured. Please try again.");
          } else { 
            this.openSnackBar(error.error) 
          }} );
  }


  openSnackBar(message: string) {
    
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-warn'],
    });
  }

  

  

}

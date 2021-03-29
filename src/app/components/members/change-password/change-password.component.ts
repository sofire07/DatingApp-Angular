import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { UpdatePassword } from '../../../.models/update-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() member: UserLoggedIn;
  editPassword: UpdatePassword = new UpdatePassword();
  constructor(private account: AccountService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  ChangePassword(event){
    event.preventDefault();
    this.account.editPassword(this.editPassword).subscribe((res) => this.openSuccessBar("Password updated successfully!"),
        (error) => {                              
          if(typeof error.error != "string") {
            this.openFail("An error occured. Please try again.");
          } else { 
            this.openFail(error.error) 
          }} );
  }
  

  openSuccessBar(message: string) {
    
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }

  openFail(message: string) {
    
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-warn'],
    });
  }

}

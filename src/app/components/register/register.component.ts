import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/.models/register-user';
import { AccountService } from 'src/app/.services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = new RegisterUser();
  age: number;
  constructor(private account: AccountService, private dialog: MatDialog, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  RegisterUser(event){
    console.log(this.registerUser);
    this.account.registerUser(this.registerUser).subscribe(x=> {
      if(x==true) { this.snackSuccess("Registration successful!"); this.router.navigateByUrl('/login'); }
      }, error => { 
        if(typeof error.error != "string") {
          this.snackFail("An error occured. Please try again.");
        } else { 
          this.snackFail(error.error) 
        }
      }
    );
  }


  snackSuccess(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }

  snackFail(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-warn'],
    });
  }

}

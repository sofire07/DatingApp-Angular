import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: UserLoggedIn;
  // @HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
  //   if (this.editForm.dirty){
  //     $event.returnValue=true;
  //   }
  // }
  constructor(private account: AccountService, private userService: UserService, private snack: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
    this.account.currentUser$.subscribe(userloggedin => this.member = userloggedin);
  }

  updateMember(){
    this.snackSuccess("Profile updated successfully!");
    this.userService.updateUser(this.member).subscribe(()=>this.route.navigateByUrl("/members/"+this.member.userName));
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

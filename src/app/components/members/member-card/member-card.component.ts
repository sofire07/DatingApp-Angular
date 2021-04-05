import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikeParams } from 'src/app/.models/likeParams';
import { UserParams } from 'src/app/.models/userParams';
import { PresenceService } from 'src/app/.services/presence.service';
import { UserService } from 'src/app/.services/user.service';
import { User } from '../../../.models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  likeParams: LikeParams;
  liking: User[] = Array<User>();
  likingUsernames: string[] = Array<string>();

  constructor(private userService: UserService, private snack: MatSnackBar, public presence: PresenceService) { }

  ngOnInit(): void {
    this.getLiking();
  }

  ngOnChanges(){
  }

  addLike(user: User){
    this.userService.addLike(user).subscribe(() => this.snackSuccess("You have liked " + user.knownAs + "."));
    this.likingUsernames.splice(0, 0, user.userName);
  }

  removeLike(user: User){
    this.userService.removeLike(user).subscribe(() => this.snackSuccess("You have un-liked " + user.knownAs + "."));
    let index = this.likingUsernames.indexOf(user.userName);
    this.likingUsernames[index] = "";
  }

  getLiking(){
    this.userService.getLiking().subscribe(users => {this.liking = users; this.liking.forEach(x=> this.likingUsernames.push(x.userName));});
  }

  snackSuccess(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }



}

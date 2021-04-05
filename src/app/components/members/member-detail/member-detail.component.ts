import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/.models/user';
import { UserService } from 'src/app/.services/user.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikeParams } from 'src/app/.models/likeParams';
import { MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { Message } from 'src/app/.models/message';
import { MessageService } from 'src/app/.services/message.service';
import { PresenceService } from 'src/app/.services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, 
    public presence: PresenceService,
    private route: ActivatedRoute, 
    private account: AccountService, 
    private snack: MatSnackBar,
    private messageService: MessageService) { }

  
  user: User;
  currentUser: UserLoggedIn;
  liking: User[] = Array<User>();
  likingUsernames: string[] = Array<string>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  selectedIndex: number;
  // messages: Message[];


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userService.getUserByUsername(params.get('userName')).subscribe(x=> {
        this.user=x;
        this.galleryImages = this.getImages();
        this.route.queryParams.subscribe((data) => {
          if(data.tab === '3'){
            this.selectedIndex = 3;
            this.messageService.createHubConnection(this.currentUser, this.user.userName);
          }
        });
      })
    });
  
    this.account.currentUser$.pipe(take(1)).subscribe(userloggedin => this.currentUser = userloggedin);
    
    this.galleryOptions = [
      {
        width: '500px',
        height: '700px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageArrowsAutoHide: true,
        preview: false
      }
    ]

    this.getLiking();
  }


  getImages(): NgxGalleryImage[] {
    const photoUrls = [];
    for (const photo of this.user.photos){
      photoUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      })
    }
    return photoUrls;
  }

  getLiking(){
    this.userService.getLiking().subscribe(users => {this.liking = users; this.liking.forEach(x=> this.likingUsernames.push(x.userName))});
  }

  addLike(user: User){
    this.userService.addLike(user).subscribe(() => this.snackSuccess("You have liked " + user.knownAs + "."));
    this.likingUsernames.push(user.userName);
  }

  removeLike(user: User){
    this.userService.removeLike(user).subscribe(() => this.snackSuccess("You have un-liked " + user.knownAs + "."));
    let index = this.likingUsernames.indexOf(user.userName);
    this.likingUsernames[index] = "";
  }

  snackSuccess(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }
  
  // getMessageThread(){
  //   this.messageService.getMessageThread(this.user.userName).subscribe(resp=>{
  //     this.messages = resp;
  //     console.log(resp);
  //   });
  // }

  onTabChanged(event){
    if(this.selectedIndex == 3){
      this.messageService.createHubConnection(this.currentUser, this.user.userName);
    } else{
      this.messageService.stopHubConnection();
    }
  }


  ngOnDestroy(): void {
    if(this.user.userName != this.currentUser.userName){
      this.messageService.stopHubConnection();
    }
  }


  


 

}

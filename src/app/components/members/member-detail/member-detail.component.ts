import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/.models/user';
import { UserService } from 'src/app/.services/user.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private account: AccountService) { }
  user: User;
  currentUser: UserLoggedIn;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userService.getUserByUsername(params.get('userName')).subscribe(x=> {
        this.user=x;
        this.galleryImages = this.getImages();
      })
    });

    this.account.currentUser$.pipe(take(1)).subscribe(userloggedin => this.currentUser = userloggedin);
    
    this.galleryOptions = [
      {
        width: '500px',
        height: '700px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: false,
        preview: false
      }
    ]
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

  // loadUser(){
  //   this.userService.getUserByUsername(this.route.snapshot.paramMap.get('userName')).subscribe(x => {
  //     this.user = x;
      
  //   })
  // }

}

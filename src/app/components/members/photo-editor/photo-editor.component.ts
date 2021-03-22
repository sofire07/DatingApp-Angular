import { PathLocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/.models/photo';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { UserService } from 'src/app/.services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: UserLoggedIn;
  baseUrl = environment.apiUrl;

  constructor(private userService: UserService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(photo.id).subscribe(()=>{
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p=>{
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        }
      )
      this.userService.updateUserList(this.member);
    })
  }

  deletePhoto(photo: Photo){
    this.userService.deletePhoto(photo.id).subscribe(()=>{
      this.member.photos = this.member.photos.filter(x=>x.id !== photo.id);
      this.userService.updateUserList(this.member);
    }, (error) => {});
  }
}

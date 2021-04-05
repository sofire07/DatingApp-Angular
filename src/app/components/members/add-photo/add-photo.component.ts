import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  @Input() member: UserLoggedIn;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + "Users/add-photo",
      authToken: 'Bearer ' + this.member.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,

    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {

      if(response){

        const photo = JSON.parse(response);
        console.log(photo);
        if(this.member.photos.length == 0){
          this.member.photoUrl = photo.url;
        }
        this.member.photos.push(photo);
        this.accountService.setCurrentUser(this.member);
        
      }
    }
  }

}

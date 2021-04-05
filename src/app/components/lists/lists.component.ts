import { Component, OnInit } from '@angular/core';
import { LikeParams } from 'src/app/.models/likeParams';
import { Pagination } from 'src/app/.models/pagination';
import { User } from 'src/app/.models/user';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  likedBy: User[] = Array<User>();
  liking: User[] = Array<User>();
  isChecked = true;
  constructor(private userService: UserService) {

   }

  ngOnInit(): void {
    this.getLiking();
    this.getLikedBy();
  }


  getLiking(){
    return this.userService.getLiking().subscribe(liking => { this.liking = liking; });
  }

  getLikedBy(){
    return this.userService.getLikedBy().subscribe(likedBy => { this.likedBy = likedBy});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../.models/user';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLoggedIn } from '../.models/user-logged-in';
import { map } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl;
  users: User[] = [];
  constructor(private httpClient: HttpClient, private accountService: AccountService) { }

  getUsers() : Observable<User[]>{
    if(this.users.length > 0) return of(this.users);
    return this.httpClient.get<User[]>(this.baseUrl + "users").pipe(
      map(users => {
        this.users = users;
        return users;
      }
    ));
  }

  getUser(id: string) : Observable<User>{
    const user = this.users.find(x=>x.id === id);
    if(user !== undefined) return of(user);
    return this.httpClient.get<User>(this.baseUrl + "users/" + id);
  }

  getUserByUsername(username: string) : Observable<User>{
    const user = this.users.find(x=>x.userName === username);
    if(user !== undefined) return of(user);
    return this.httpClient.get<User>(this.baseUrl + "users/username/" + username);
  }

  updateUser(updatedUser: UserLoggedIn){
    return this.httpClient.put(this.baseUrl + "users/", updatedUser).pipe(
      map(()=> {
        this.accountService.setCurrentUser(updatedUser);
        this.getUser(updatedUser.id).subscribe(user => {
          const index = this.users.indexOf(user);
          console.log("updated user index: " + index);
          this.users[index] = updatedUser; } )  
      }
      )
    );
  }

  updateUserList(updatedUser: UserLoggedIn){
    this.accountService.setCurrentUser(updatedUser);
    this.getUser(updatedUser.id).subscribe(user => {
          const index = this.users.indexOf(user);
          this.users[index] = updatedUser; } );  
  }

  setMainPhoto(photoId: number){
    return this.httpClient.put(this.baseUrl + "Users/set-main-photo/" + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.httpClient.delete(this.baseUrl + "Users/delete-photo/" + photoId);
  }


}

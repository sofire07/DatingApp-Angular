import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../.models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLoggedIn } from '../.models/user-logged-in';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl + "users");
  }

  getUser(id: string) : Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + "users/" + id);
  }

  getUserByUsername(username: string) : Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + "users/username/" + username);
  }

  updateUser(updatedUser: UserLoggedIn){
    return this.httpClient.put<any>(this.baseUrl + "users/", updatedUser);
  }


}

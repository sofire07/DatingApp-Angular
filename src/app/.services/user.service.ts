import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../.models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "https://localhost:44307/Users/";
  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  getUser(id: string) : Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + id);
  }


}

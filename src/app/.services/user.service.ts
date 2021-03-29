import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../.models/user';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLoggedIn } from '../.models/user-logged-in';
import { map, take } from 'rxjs/operators';
import { AccountService } from './account.service';
import { PaginatedResult } from '../.models/pagination'
import { UserParams } from '../.models/userParams'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl;
  users: User[] = [];
  memberCache = new Map();
  loggedIn: UserLoggedIn;
  userParams: UserParams;

  constructor(private httpClient: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.loggedIn = user;
      this.userParams = new UserParams(user);
    })
   }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params;
  }

  resetUserParams(){
    this.userParams = new UserParams(this.loggedIn);
    return this.userParams;
  }

  getUsers(userParams: UserParams){
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }

    let params = this.getPaginationHeader(userParams.CurrentPage, userParams.PageSize);
    params = params.append("minAge", userParams.minAge.toString());
    params = params.append("maxAge", userParams.maxAge.toString());
    params = params.append("gender", userParams.gender);
    params = params.append("orderBy", userParams.orderBy);
    //if(this.users.length > 0) return of(this.users);
    return this.getPaginatedResult<User[]>(this.baseUrl+"Users", params).pipe(
      map(response=>{
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    )
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.httpClient.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
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

  getPaginationHeader(pageNumber: number, pageSize: number){
    let params = new HttpParams();
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    return params;
  }


}

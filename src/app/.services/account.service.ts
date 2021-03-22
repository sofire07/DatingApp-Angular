import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../.models/register-user';
import { UserLoggedIn } from '../.models/user-logged-in';
import { LoginUser } from '../.models/login-user';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../.models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  baseUrl: string = environment.apiUrl;
  private currentUserSource = new ReplaySubject<UserLoggedIn>(1);
  currentUser$ = this.currentUserSource.asObservable();

  registerUser(newUser: RegisterUser): Observable<boolean>{
    return this.httpClient.post<boolean>(this.baseUrl + "account/register", newUser);
  }

  loginUser(userLogin: LoginUser){
    return this.httpClient.post<UserLoggedIn>(this.baseUrl + "account/login", userLogin).pipe(
      map((response: UserLoggedIn) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: UserLoggedIn){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.clear();
    this.currentUserSource.next(null);
    //this.router.navigateByUrl('/');
            // .then(() => {window.location.reload()}) 
  }

}

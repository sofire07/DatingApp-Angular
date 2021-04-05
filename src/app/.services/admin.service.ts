import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../.models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUsersWithRoles(){
    return this.httpClient.get<Partial<User[]>>(this.baseUrl + 'Admin/users-with-roles');
  }

  updateRole(username: string, roles: string[]){
    return this.httpClient.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }


}

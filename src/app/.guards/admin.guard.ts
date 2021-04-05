import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../.services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private snack: MatSnackBar){}
  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user.roles.includes('Admin') || user.roles.includes('Moderator')){
          return true;
        }
        this.snackFail('You cannot enter this area');
      })
    )
  }

  snackFail(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-warn'],
    });
  }
  
}

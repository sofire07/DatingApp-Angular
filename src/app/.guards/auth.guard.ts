import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../.services/account.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private account: AccountService, private router: Router, private snack: MatSnackBar){}
  canActivate(): Observable<boolean> {
    return this.account.currentUser$.pipe(
      map(user => {
        if(user) return true;
        else { this.snackFail("Unauthorized. Must login first."); this.router.navigateByUrl(''); }
      })
    );
  }

  snackFail(message: string) {
    this.snack.open(message, null, {
      duration: 2000,
      panelClass: ['mat-warn'],
    });
  }
  
}

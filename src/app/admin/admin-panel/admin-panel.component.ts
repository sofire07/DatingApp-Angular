import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserLoggedIn } from 'src/app/.models/user-logged-in';
import { AccountService } from 'src/app/.services/account.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  selectedIndex = 0;
  currentUser: UserLoggedIn;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(x=>this.currentUser = x);
  }

}

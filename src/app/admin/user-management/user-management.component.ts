import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/.models/user';
import { AdminService } from '../../.services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { EditRoleDialogComponent } from './edit-role-dialog/edit-role-dialog.component';
import { DialogEditRole } from 'src/app/.models/edit-role-dialog';
import { ValueTransformer } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private adminService: AdminService, private dialog: MatDialog, private snack: MatSnackBar) { }
  users: Partial<User[]>;
  editRole: DialogEditRole;

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    });
  }

  openDialog(user: User) : void{
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '500px',
      data: {
          user: user,
          roles: this.getRolesArray(user)
      },
      restoreFocus:false
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res != undefined){
        
        const rolesToUpdate = {
          roles: [...res.roles.filter(el => el.checked === true).map(el => el.name)]
        }
        user.roles = rolesToUpdate.roles;
        this.adminService.updateRole(res.user.username, rolesToUpdate.roles).subscribe(() => this.snackSuccess("Roles updated successfully"))
      }
    });
  }

  private getRolesArray(user){
    console.log(user);
    const roles = [];
    const userRoles = user.roles;
    console.log(userRoles);
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'User', value: 'User'},
    ];

    console.log(availableRoles);

    availableRoles.forEach(role=>{
      let isMatch = false;
      for(const userRole of userRoles){
        if(role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if(!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })
    console.log(roles);
    return roles;
  }

  snackSuccess(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }

  snackFail(message: string) {
    this.snack.open(message, null, {
      duration: 3000,
      panelClass: ['mat-warn'],
    });
  }

}

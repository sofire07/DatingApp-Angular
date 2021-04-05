import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditRole } from '../../../.models/edit-role-dialog';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.css']
})
export class EditRoleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEditRole) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

}

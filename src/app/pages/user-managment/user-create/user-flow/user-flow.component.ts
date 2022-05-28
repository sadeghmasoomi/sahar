import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserCreateOperationComponent} from '../user-create-operation/user-create-operation.component';

@Component({
  selector: 'app-user-flow',
  templateUrl: './user-flow.component.html',
  styleUrls: ['./user-flow.component.scss']
})
export class UserFlowComponent {
  forms: any;
  formData: any = {};
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  active = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserCreateOperationComponent>,
              private callData: CallDataMembersService,
              private snackBar: MatSnackBar) {
    this.ngGetUserFirmsForm();
    if (data.data) {
      this.formData = data;
      this.active = true;
    }
  }

  ngOperationFlow(action: number): void {
    if (this.formData) {
      this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
      this.formData.Action = action;
      this.formData.UserGCode = this.data.userGCode;
      this.callData.UserGroupRankFlowUpdate(this.formData).subscribe(res => {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: res.state ? 'panel-success' : 'panel-error'
        });
        if (res.state) {
          this.onNoClick(true);
        }
      });
    } else {
      this.snackBar.open('فرم شما نمی‌تواند خالی باشد', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  ngGetUserFirmsForm(): void {
    this.callData.userFirmsForm().subscribe(res => {
      this.forms = res.msg;
    });
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

  onNoClick(value: boolean): void {
    this.dialogRef.close(value);
  }
}

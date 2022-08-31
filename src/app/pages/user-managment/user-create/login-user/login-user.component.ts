import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  formData: any = {};
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  employee: any;
  name!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<LoginUserComponent>,
              private callData: CallDataMembersService,
              private snackBar: MatSnackBar) { }


  ngSearch(name: string): void {
    const data = {
      Kind: 'User101S',
      LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      FV1: name
    };
    this.callData.getFirmsUserData(data).subscribe( res => {
      if (res.state) {
       this.employee = res.msg[0];
      }
    });
  }

  ngOperationUsersFree(): void  {
    if (!this.formData) {
      this.snackBar.open('لطفا تاریخ ورود را وارد کنید', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }
    this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    this.formData.Action = 1;
    this.formData.UserGCode = this.employee.GCode;
    this.callData.UserFirmFlowUpdate(this.formData).subscribe(res => {
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

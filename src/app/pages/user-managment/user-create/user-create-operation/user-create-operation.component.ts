import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CallDataMembersService} from '../../../../services/members/call-data.service';

@Component({
  selector: 'app-user-create-operation',
  templateUrl: './user-create-operation.component.html',
  styleUrls: ['./user-create-operation.component.scss']
})
export class UserCreateOperationComponent{
  forms: any;
  formData: any = {};
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  name!: string;
  BirthDate!: string;
  active = false;
  numberForm = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserCreateOperationComponent>,
              private callData: CallDataMembersService,
              private snackBar: MatSnackBar) {
    if (data) {
      this.formData = data;
      this.active = true;
      this.numberForm = 1;
    }
    this.ngGetAddUserToFirmForm();
  }

  ngGetAddUserToFirmForm(): void {
    if (!this.forms) {
      this.callData.AddUserToFirmForm().subscribe(res => {
        this.forms = res.msg;
      });
    }
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

  dateModeAlon(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.BirthDate = val2;
    }
  }

  ngOperationUsers(action: number): void  {
    if (!this.formData) {
      this.snackBar.open('فرم شما نمی‌تواند خالی باشد', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }
    this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    this.formData.Action = action;
    this.callData.UsersUpdate(this.formData).subscribe(res => {
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

  ngSearch(name: string, BirthDate: string): void {
    const data = {
      Kind: 'User101SA',
      LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      FV1: name
    };
    this.callData.getFirmsUserData(data).subscribe( res => {
      if (res.state) {
        const userData = res.msg[0];
        this.snackBar.open('کارمند قبلا ثبت شده است', 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
        this.formData = {
          FirstName: userData.FirstName,
          LastName: userData.LastName,
          GnrSexGcode: userData.GnrSexGcode,
          FatherName: userData.FatherName,
          NationalId: userData.NationalId,
          IdNumber: userData.IdNumber,
          BirthDate: userData.BirthDate,
          UserGroupGCode: userData.UserGroupGCode,
          UserGroupRankGCode: userData.UserGroupRankGCode,
          Mobile: userData.Mobile,
          Email: userData.Email,
        };
        this.numberForm = 2;
      } else {
        this.snackBar.open('کاربر را ضافه کنید', 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.formData = {
          NationalId: this.name,
          BirthDate
        };
        this.ngCheckUserData(this.formData);
        this.numberForm = 1;
      }
    });
  }

  ngCheckUserData(data: {NationalID: string, birthDate: string}): void {
    console.log('data:', data);
    this.callData.getCheckUserData(data).subscribe( res => {
      if (res.state) {
        this.formData = {
          FirstName: res.msg.name[0],
          LastName: res.msg.family[0],
          GnrSexGcode: res.msg.gender[0] == 1 ? '10001' : '10002' ,
          FatherName: res.msg.fatherName[0],
          NationalId: this.name,
          IdNumber: res.msg.shenasnameNo[0],
          BirthDate: this.BirthDate,
        }
      }
    });
  }

  onNoClick(value: boolean): void {
    this.dialogRef.close(value);
  }
}

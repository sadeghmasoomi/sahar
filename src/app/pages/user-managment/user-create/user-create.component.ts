import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {UserCreateOperationComponent} from './user-create-operation/user-create-operation.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserFlowComponent} from './user-flow/user-flow.component';
import {LoginUserComponent} from './login-user/login-user.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnDestroy {
  constructor(private callData: CallDataMembersService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.ngGetUsers();

  }
  indexUpdate!: number;
  dataValues: any;
  membersConnect: any;
  members!: MatTableDataSource<any>;
  name!: string;
  formData: any = {};
  editActive = false;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  EndJdate = '';
  columnsToDisplay = [
    'Position',
    'StartJdate',
    'EndJDate',
    'FirmName',
    'Dsc',
    'StatusName',
    'operasion',
  ];
  columnsToDisplayFlow = [
    'Position',
    'UserGroupRankGCode',
    'StartJdate',
    'Dsc',
    'StatusGcode',
    'operasion',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngGetUsers(): void {
    const data = {
      Kind: 'User13101',
      LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getFirmsUserData(data).subscribe( res => {
      this.dataValues = res.msg;
      this.members = new MatTableDataSource<any>(this.dataValues);
      this.members.paginator = this.paginator;
      this.membersConnect = this.members.connect();
    });
  }

  ngGetUserDetails(item: any, active: boolean = false): void {
    if (!item.Details || active) {
      const data = {
        Kind: 'User13201',
        MasterCode: item.GCode,
        LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
      };
      this.callData.getFirmsUserData(data).subscribe( res => {
        item.Details = res.msg;
      });
    }
    this.ngGetUserFlow(item);
  }

  ngGetUserFlow(item: any, active: boolean = false): void {
    if (!item.Flow || active) {
      const data = {
        Kind: 'User13202',
        MasterCode: item.GCode,
        LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
      };
      this.callData.getFirmsUserData(data).subscribe( res => {
        item.Flow = res.msg;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.members) {
      this.members.disconnect();
    }
  }

  ngSearch(name: string): void {
    name = name.trim();
    name = name.toLowerCase();
    this.members.filter = name;
  }

  operationUser(data: any = null): void {
    const dialogRef = this.dialog.open(UserCreateOperationComponent,
      {
        width: '650px',
        height: '600px',
        data,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngGetUsers();
      }
    });
  }

  loginUser(): void {
    const dialogRef = this.dialog.open(LoginUserComponent,
      {
        width: '650px',
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngGetUsers();
      }
    });
  }

  operationFlow(item: any, data: any = null): void {
    const dialogRef = this.dialog.open(UserFlowComponent,
      {
        width: '650px',
        data: {userGCode: item.GCode, data}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngGetUsers();
      }
    });
  }

  dateMode(value: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.EndJdate = val2;
    }
  }

  accept(item: any, action: number): void {
    const data = {
      GCode: item,
      FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      Action: action
    };
    this.callData.UsersUpdate(data).subscribe(res => {
      this.snackBar.open(res.msg, 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: res.state ? 'panel-success' : 'panel-error'
      });
      if (res.state) {
        this.ngGetUserDetails(item, true);
      }
    });
  }

  acceptFlow(element: any, item: any, action: number): void {
    const data = {
      GCode: element,
      FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      Action: action
    };
    this.callData.UserGroupRankFlowUpdate(data).subscribe(res => {
      this.snackBar.open(res.msg, 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: res.state ? 'panel-success' : 'panel-error'
      });
      if (res.state) {
        this.ngGetUserFlow(item, true);
      }
    });
  }

  logOutInCompany(element: any, item: any): void {
    if (!this.EndJdate) {
      this.snackBar.open('لطفا تاریخ خروج را وارد کنید', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }
    if (confirm(' خروج کارمند ثبت شود ؟')) {
      element.EndJDate = this.EndJdate;
      const data = {
        EndJDate: this.EndJdate,
        UserGCode: item.GCode,
        Action: 2,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        StartJdate: element.StartJdate,
        Dsc: element.Dsc,
        GCode: element.GCode,
      };
      this.callData.UserFirmFlowUpdate(data).subscribe(res => {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: res.state ? 'panel-success' : 'panel-error'
        });
        if (res.state) {
          this.editActive = false;
          this.ngGetUsers();
        }
      });
    }

  }

}

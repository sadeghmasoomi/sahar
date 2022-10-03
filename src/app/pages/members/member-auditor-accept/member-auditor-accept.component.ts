import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CallDataMembersService } from '../../../services/members/call-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-auditor-accept',
  templateUrl: './member-auditor-accept.component.html',
  styleUrls: ['./member-auditor-accept.component.scss'],
})
export class MemberAuditorAcceptComponent {
  MembersList!: MatTableDataSource<any>;
  MembersListData: any;
  MembersListConnect: any;
  name!: string;
  columnsToDisplay = [
    'Position',
    'StartJdate',
    'EndJdate',
    'KIndName',
    'FirmName',
    'Dsc',
    'StatusName',
    'operasion',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private callData: CallDataMembersService,
    private snackBar: MatSnackBar
  ) {
    this.ngGetMembers();
  }

  ngGetMembers(): void {
    const data: any = {
      Kind: 'M22111',
    };
    this.callData.getSaharMembers(data).subscribe((members) => {
      console.log('members==>', members);
      this.MembersListData = members.msg;
      this.MembersList = new MatTableDataSource<any>(this.MembersListData);
      this.MembersList.paginator = this.paginator;
      this.MembersListConnect = this.MembersList.connect();
    });
  }

  ngGetMemberData(item: any): void {
    const data = {
      Kind: 'mem101D1',
      MasterCode: item.GCode,
    };
    this.callData.getMemberData(data).subscribe((member) => {
      if (member.state) {
        item.dataValue = member.msg;
      }
    });
  }

  activeMemberFlow(element: any, item: any, status: number): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode: element.GCode,
        MemInfoHdrGCode: element.MemInfoGCode,
        FirmInfoHdrGCode: element.FirmInfoHdrGCode,
        UserGroupRankGCode: element.UserGroupRankGCode,
        StatusGcode: status,
        action: 21,
      };
      this.callData.memberFlow(data).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success',
          });
          this.ngGetMemberData(item);
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error',
          });
        }
      });
    }
  }

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.MembersListData) {
      const list: any = {};
      if (item.NationalID) {
        list['شناسه ملی'] = item.NationalID;
      }
      if (item.FName && item.LName) {
        list[' نام و نام خانوادگی'] = item.FName + ' ' + item.LName;
      }
      if (item.Code) {
        list['کد عضویت'] = item.Code;
      }
      if (item.NationalCode) {
        list['شماره ملی'] = item.NationalCode;
      }
      if (item.MemGroupRankName) {
        list['وضعیت '] =
          item.MemGroupRankName !== '' ? item.MemGroupRankName : 'نامشخص';
      }
      if (item.Accept) {
        list['اطلاعات '] = item.Accept ? 'تایید شده' : 'تایید نشده';
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of report');
  }

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.MembersList.filter = name;
  }

  acceptMember(GCode: string, status: number): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode,
        StatusGcode: status,
        action: 21,
      };
      this.callData.sendMemberAction(data).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success',
          });
          this.ngGetMembers();
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error',
          });
        }
      });
    }
  }
}

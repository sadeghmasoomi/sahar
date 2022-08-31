import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CallDataMembersService } from '../../../services/members/call-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-auditor',
  styleUrls: ['./member-auditor.component.scss'],
  templateUrl: './member-auditor.component.html',
})
export class MemberAuditorComponent implements OnInit, OnDestroy {
  MembersList!: MatTableDataSource<any>;
  MembersListData: any;
  MembersListConnect: any;
  formData: any = {};
  params: any;
  pageNumber!: number;
  name!: string;
  memberData: any = [];
  rankItems: any;
  firms: any;
  active = false;
  lastCode!: string;
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
  datePickerConfig: any = {
    format: 'jYYYYjMMjDD',
  };
  edit!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private callData: CallDataMembersService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetMembers(true);
      } else {
        this.ngGetMembers(false);
      }
    });
  }

  ngOnInit(): void {
    this.ngGetUserGroupRank();
  }

  ngGetMembers(stateValue: boolean): void {
    this.pageNumber = 1;
    if (stateValue) {
      this.pageNumber = Number(this.params.get('pageNumber'));
    }
    const data: any = {
      Kind: 'mem101',
      pageNumber: this.pageNumber,
      FV1: '',
    };
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getSaharMembers(data).subscribe((members) => {
      this.active = true;
      if (members.state) {
        this.MembersListData = members;
        this.lastCode = this.MembersListData.msg[0].LastCode;
        this.MembersList = new MatTableDataSource<any>(
          this.MembersListData.msg
        );
        this.MembersList.paginator = this.paginator;
        this.MembersListConnect = this.MembersList.connect();
        if (members.msg[members.msg.length - 1].Code) {
          sessionStorage.setItem(
            'lastAud',
            JSON.stringify(members.msg[members.msg.length - 1].Code)
          );
        }
      }
    });
  }

  ngGetMemberData(item: any): void {
    const data = {
      Kind: 'mem101D1',
      MasterCode: item.GCode,
    };
    this.callData.getMemberData(data).subscribe((member) => {
      const getMemberDataValue: any = {
        StartJdate: null,
        EndJdate: null,
        KIndName: null,
        FirmName: null,
        Dsc: null,
      };
      if (member.state) {
        item.dataValue = member.msg;
        item.dataValue[item.dataValue.length] = getMemberDataValue;
      } else {
        item.dataValue = [getMemberDataValue];
      }
    });
  }

  ngSearch(name: string): void {
    this.router.navigate(['SaharMember/MemberAuditor', 1, name]);
    // name = name.trim(); // Remove whitespace
    // name = name.toLowerCase(); // Datasource defaults to lowercase matches
    // this.MembersList.filter = name;
  }

  ngAddState(item: any): void {
    if (this.formData.StartJdate && this.formData.UserGroupRankGCode) {
      this.formData.MemInfoHdrGCode = item.GCode;
      this.formData.action = 1;
      this.callData.memberFlow(this.formData).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success',
          });
          this.ngGetMemberData(item);
          this.formData = {};
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error',
          });
          this.formData = {};
        }
      });
    } else {
      this.snackBar.open('لطفا فیلد های الزامی را پر کنید.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error',
      });
    }
  }

  ngGetUserGroupRank(): void {
    this.callData.getUserGroupRank().subscribe((ranks) => {
      this.rankItems = ranks.msg.data;
    });
  }

  getFirms(text: any): void {
    this.pageNumber = 1;
    const data = {
      pageNumber: this.pageNumber,
      Kind: 'Firm101',
      FV1: text,
    };
    this.callData.getFirms(data).subscribe((firms) => {
      this.firms = firms.msg;
    });
  }

  deleteFlow(Gcode: string, mainGcode: any): void {
    if (confirm('سوابق در جامعه حدف شود ؟')) {
      const datad = {
        action: 3,
        GCode: Gcode,
      };
      this.callData.memberFlow(datad).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success',
          });
          this.ngGetMemberData(mainGcode);
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

  dateMode(value: string, name: string): void {
    const val = value.replace('/', '');
    const val2 = val.replace('/', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

  acceptMember(GCode: string): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode,
        StatusGcode: 10,
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
          this.ngGetMembers(false);
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

  activeMemberFlow(element: any, item: any): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode: element.GCode,
        MemInfoHdrGCode: element.MemInfoGCode,
        FirmInfoHdrGCode: element.FirmInfoHdrGCode,
        UserGroupRankGCode: element.UserGroupRankGCode,
        StatusGcode: 10,
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
    for (const item of this.MembersListData.msg) {
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

  InitFlow(element: any): void {
    element.edit = !element.edit;
    this.edit = element.edit;
    if (element.edit) {
      this.formData = {
        GCode: element.GCode,
        StartJdate: element.StartJdate,
        EndJdate: element.EndJdate,
        UserGroupRankGCode: element.UserGroupRankName,
        FirmInfoHdrGCode: element.FirmInfoHdrGCode,
        Dsc: element.Dsc,
        StatusGcode: element.StatusGcode,
        action: 2,
      };
    } else {
      this.formData = {};
    }
  }

  closeEditFlow(element: any): void {
    element.edit = false;
    this.formData = {};
  }

  editFlow(item: any): void {
    this.callData.memberFlow(this.formData).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success',
        });
        this.formData = {};
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

  getUserImages(item: any): void {
    if (!item.userImage) {
      const data = {
        MasterCode: item.GCode,
      };
      this.callData.UserImages(data).subscribe((userImages) => {
        if (userImages.msg.length) {
          for (const index of userImages.msg) {
            if (index.Picture) {
              index.encodePicture =
                this.sanitizer.bypassSecurityTrustResourceUrl(
                  'data:image/jpg;base64,' + index.Picture
                );
            }
          }
          item.userImage = userImages.msg;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.MembersList) {
      this.MembersList.disconnect();
    }
  }
}

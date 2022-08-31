import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AddFirmDtlComponent} from './add-firm-dtl/add-firm-dtl.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-firm-auditor',
  templateUrl: './firm-auditor.component.html',
  styleUrls: ['./firm-auditor.component.scss'],
})

export class FirmAuditorComponent implements OnInit, OnDestroy {
  firms!: MatTableDataSource<any>;
  firmsConnect: any;
  firmsValues: any;
  activeFirm = false;
  params: any;
  pageNumber!: number;
  name!: string;
  members: any;
  active = false;
  displayedColumns = [
    'Position',
    'CityName',
    'BranchTradeNo',
    'BranchTradeDAte',
    'ZipCode',
    'OfficeName',
    'Address',
    'Tel',
    'Fax',
    'operion'
  ];
  displayedColumnsMembers = [
    'Position',
    'FName',
    'LName',
    'Name',
    'Code',
  ];
  columnsToDisplayInfoFlow = [
    'Position',
    'StartJdate',
    'EndJdate',
    'StatusName',
    'Dsc',
    'operasion',
  ];
  formData: any = {};
  firmsData: any = [];
  datePickerConfig: any = {
    format: 'jYYYYjMMjDD'
  };
  rankItems: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataMembersService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.reset();
      if (this.params.get('pageNumber')) {
        this.getFirms(true);
      } else {
        this.getFirms(false);
      }
    });
    this.ngGetUserGroupRank();
  }

  ngOnDestroy(): void {
    if (this.firms) {
      this.firms.disconnect();
    }
  }

  getFirms(state: boolean): void {
    this.pageNumber =  1;
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
    }
    const data: any = {
      Kind: 'Firm101',
      pageNumber: this.pageNumber,
      FV1: '',
    };
    if (this.params && this.params.get('nameSearch') && this.params.get('nameSearch') !== 'false') {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    if (this.params && Boolean(this.params.get('activeFirm'))) {
      data.FI1 = 1;
      this.activeFirm = true;
    }
    this.callData.getFirms(data).subscribe((firms) => {
      this.active = true;
      if (firms.state) {
        this.firmsValues = firms.msg;
        this.firms = new MatTableDataSource<any>(this.firmsValues);
        this.firms.paginator = this.paginator;
        this.firmsConnect = this.firms.connect();
        if (firms.msg[firms.msg.length - 1].Code) {
          sessionStorage.setItem('lastFirm', JSON.stringify(firms.msg[firms.msg.length - 1].Code));
        }
      }
    });
  }

  getFirmsData(item: any): void {
    const data = {
      MasterCode: item.GCode
    };
    this.callData.getFirmsData(data).subscribe((res) => {
      item.dataValue = res.msg;
    });
    this.callData.getFirmMembers(data).subscribe((members) => {
      item.members = members.msg;
    });
    this.getMemberData(item);
  }

  getMemberData(item: any): void {
    const data = {
      Kind: 'Firm101D2',
      MasterCode: item.GCode,
    };
    this.callData.getMemberData(data).subscribe((res) => {
      const getMemberDataValue: any = {
        StartJdate: null,
        EndJdate: null,
        KIndName: null,
        Dsc: null,
      };
      if (res.state) {
        item.memberData = res.msg;
        item.memberData[item.memberData.length] = getMemberDataValue;
      } else  {
        item.memberData = [getMemberDataValue];
      }
    });
  }

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.firms.filter = name;

  }

  optionActiveFirm(event: any): void {
    this.activeFirm = event.checked;
    if (event.checked) {
      if (this.params.get('nameSearch')) {
        this.router.navigate(['SaharMember/FirmAuditor', 1, this.params.get('nameSearch'), 'activeFirm']);
      } else {
        this.router.navigate(['SaharMember/FirmAuditor', 1, 'false', 'activeFirm']);
      }
    } else {
      if (this.params.nameSearch) {
        this.router.navigate(['SaharMember/FirmAuditor', 1, this.params.get('nameSearch')]);
      } else {
        this.router.navigate(['SaharMember/FirmAuditor', 1]);
      }
    }

  }

  reset(): void {
    if (this.params.nameSearch === '') {
      this.name = this.params.get('nameSearch');
    }
  }

  delete(Gcode: string): void {
    if (confirm('موسسه حدف شود ؟')) {
      const data = {
        action: 3,
        GCode: Gcode
      };
      this.callData.sendFirmAction(data).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          if (this.params.get('pageNumber')) {
            this.getFirms(true);
          } else {
            this.getFirms(false);
          }
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      });
    }
  }

  ngAddFirmDtl(item: any): void {
    const dialogRef = this.dialog.open(AddFirmDtlComponent,
      {
        width: '850px',
        data: {
          GCode: item.GCode
        }
      });
    dialogRef.afterClosed().subscribe(() => {
      this.getFirmsData(item);
    });
  }

  ngAddFirmDtlUpdate(element: any, item: any): void {
    element.FirmInfoHdrGCode = item.GCode;
    const dialogRef = this.dialog.open(AddFirmDtlComponent,
      {
        width: '850px',
        data: {
          element
        }
      });
    dialogRef.afterClosed().subscribe(() => {
      this.getFirmsData(item);
    });
  }

  deleteDtl(Gcode: string): void {
    if (confirm('سوابق در جامعه حدف شود ؟')) {
      const data = {
        action: 3,
        GCode: Gcode
      };
      this.callData.firmInfoDtl(data).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      });
    }
  }

  activeFirmAuditor(item: any, GCode: string): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode,
        Active: 1,
        action: 21
      };
      this.callData.firmInfoDtl(data).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.getFirmsData(item);
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      });
    }
  }

  ngGetUserGroupRank(): void {
    this.callData.getUserGroupFirmRank().subscribe((ranks) => {
      this.rankItems = ranks.msg.data;
    });
  }

  dateMode(value: string , name: string): void {
    const val = value.replace('/', '');
    const val2 = val.replace('/', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

  ngAddFirmState(item: any): void {
    if (this.formData.StartJdate && this.formData.GnrFirmStatusGCode) {
      this.formData.FirmInfoHdrGCode = item.GCode;
      this.formData.action = 1;
      this.callData.firmMemberOperation(this.formData).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.getMemberData(item);
          this.formData = {};
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
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
        panelClass: 'panel-error'
      });
    }
  }

  deleteFirmFlow(Gcode: string, item: any): void {
    if (confirm('سوابق در جامعه حدف شود ؟')) {
      const datad = {
        action: 3,
        GCode: Gcode
      };
      this.callData.firmMemberOperation(datad).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.getMemberData(item);
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      });
    }
  }

  activeMemberFirmFlow(element: any, item: any): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode: element.GCode,
        MemInfoHdrGCode: element.MemInfoGCode,
        StatusGcode: 10,
        action: 21
      };
      this.callData.firmMemberOperation(data).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.getMemberData(item);
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      });
    }
  }
}

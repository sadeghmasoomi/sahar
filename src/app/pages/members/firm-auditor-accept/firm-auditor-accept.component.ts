import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-firm-auditor-accept',
  templateUrl: './firm-auditor-accept.component.html',
  styleUrls: ['./firm-auditor-accept.component.scss']
})
export class FirmAuditorAcceptComponent implements OnInit, OnDestroy {
  name!: string;
  firms!: MatTableDataSource<any>;
  firmsConnect: any;
  firmsValues: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnsToDisplayInfoFlow = [
    'Position',
    'StartJdate',
    'EndJdate',
    'StatusName',
    'Dsc',
    'operasion',
  ];
  constructor(private callData: CallDataMembersService, private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getFirms();
  }

  ngOnDestroy(): void {
    if (this.firms) {
      this.firms.disconnect();
    }
  }

  getFirms(): void {
    const data = {
      Kind: 'F22211'
    };
    this.callData.getFirms(data).subscribe((firms) => {
      if (firms.state) {
        this.firmsValues = firms.msg;
        this.firms = new MatTableDataSource<any>(this.firmsValues);
        this.firms.paginator = this.paginator;
        this.firmsConnect = this.firms.connect();
      }
    });
  }

  getMemberData(item: any): void {
    const data = {
      Kind: 'Firm101D2',
      MasterCode: item.GCode,
    };
    this.callData.getMemberData(data).subscribe((res) => {
      if (res.state) {
        item.memberData = res.msg;
      }
    });
  }

  activeMemberFirmFlow(element: any, item: any, status: number): void {
    if (confirm('برای انجام این عملیات تایید اطمینان دارید ؟')) {
      const data = {
        GCode: element.GCode,
        StatusGcode: status,
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

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.firms.filter = name;

  }
}

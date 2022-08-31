import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-ruser-firm-flow',
  templateUrl: './ruser-firm-flow.component.html',
  styleUrls: ['./ruser-firm-flow.component.scss']
})
export class RUserFirmFlowComponent implements OnDestroy{
  dataValues: any;
  reportConnect: any;
  reports!: MatTableDataSource<any>;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  name!: string;
  columnsToDisplay: any[] = [
    'Position',
    'FirstName',
    'LastName',
    'NationalId',
    'ST',
    'Increase',
    'Decrease',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataMembersService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.ngGetReports();
  }

  ngGetReports(): void {
    const data = {
      Kind: 'RUser101M',
      LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getFirms(data).subscribe( res => {
      this.dataValues = res.msg;
      this.reports = new MatTableDataSource<any>(this.dataValues);
      this.reports.paginator = this.paginator;
      this.reportConnect = this.reports.connect();
    });
  }

  ngGetReportDetails(item: any): void {
    if (!item.Details) {
      const data = {
        Kind: 'RUser101D',
        MasterCode: item.GCode,
      };
      this.callData.getFirms(data).subscribe( res => {
        item.Details = res.msg;
      });
    }
  }

  ngSearch(name: string): void {
    name = name.trim();
    name = name.toLowerCase();
    this.reports.filter = name;
  }

  ngOnDestroy(): void {
    if (this.reports) {
      this.reports.disconnect();
    }
  }

}

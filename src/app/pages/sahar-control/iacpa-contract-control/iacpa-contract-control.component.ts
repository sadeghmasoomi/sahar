import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { CallDataService } from 'src/app/services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UnAcceptComponent} from './modal/un-accept/un-acsept.component';
import {DetailsContractComponent} from '../../sahar/audit-contract-process-manager-accept/details-contract/details-contract.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-iacpa-contract-control',
  templateUrl: './iacpa-contract-control.component.html',
  styleUrls: ['./iacpa-contract-control.component.scss']
})
export class IacpaContractControlComponent implements OnInit {
  saharControl: any;
  saharControlValues!: MatTableDataSource<any>;
  active = false;
  params: any;
  pageNumber = 1;
  name!: string;
  dates: any = {};
  columnsToDisplay = [
    'Position',
    'AuditorName',
    'CustomerName',
    'CustomerNationalID',
    'DurationDateEnd',
    'amount',
    'AvgHAmount',
    'LastAmount',
    'LastAuditor',
    'LastYear',
    'StatusName',
    'ActivityName',
    'ActionDateSign',
    'operation',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private callData: CallDataService,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetSaharControl(true);
      } else {
        this.ngGetSaharControl(false);
      }
    });
  }

  ngGetSaharControl(state: boolean): void {
    const data: any = {};
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
      data.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getSaharControl(data).subscribe((saharControl) => {
      this.saharControl = saharControl;
      this.saharControlValues = new MatTableDataSource<any>(this.saharControl.msg);
      this.saharControlValues.paginator = this.paginator;
      this.saharControlValues.sort = this.sort;
    });
  }

  ngChangeStatus(Gcode: any, status: string): void {
    if (confirm('قرارداد را تایید می کنید ؟')) {
      const data = {
        FirmContractGcode: Gcode,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        StatusGCode: status,
        action: 1,
      };
      this.callData.saharControlAccept(data)
        .pipe(first())
        .subscribe(updateSaharConrol => {
          if (updateSaharConrol.state) {
            this.snackBar.open(updateSaharConrol.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
            this.saharControlValues.filteredData.splice(this.saharControlValues.filteredData.findIndex(item =>
              item.GCode === Gcode), 1);
            this.saharControlValues = new MatTableDataSource<any>(this.saharControlValues.filteredData);
            this.saharControlValues.paginator = this.paginator;
            this.saharControlValues.sort = this.sort;
          } else {
            this.snackBar.open(updateSaharConrol.msg, 'x', {
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

  ngUnChangeStatus(GCode: any): void {
    const dialogRef = this.dialog.open(UnAcceptComponent,
      {
        width: '650px',
        data: {GCode}
      });
    dialogRef.afterClosed().subscribe(result => {
      this.saharControlValues.filteredData.splice(this.saharControlValues.filteredData.findIndex(item =>
        item.GCode === GCode), 1);
      this.saharControlValues = new MatTableDataSource<any>(this.saharControlValues.filteredData);
      this.saharControlValues.paginator = this.paginator;
      this.saharControlValues.sort = this.sort;
    });
  }

  openDetails(item: any): void {
    this.dialog.open(DetailsContractComponent, {
      width: '600px',
      data: item
    });
  }

  ngSearch(name: string): void {
    this.router.navigate(['SaharControl/IacpaContractControl', 1, name]);
    // name = name.trim(); // Remove whitespace
    // name = name.toLowerCase(); // Datasource defaults to lowercase matches
    // this.saharControlValues.filter = name;
    // this.saharControlValues.paginator = this.paginator;
    // this.saharControlValues.sort = this.sort;
  }

  filterDate(date: any): void {
    this.saharControlValues = new MatTableDataSource<any>(this.saharControl.filter((
      values: any) => Number(values.ActionDateSign) >= Number(date.one) && Number(values.ActionDateSign) <= Number(date.twe)
    ));
    this.saharControlValues.paginator = this.paginator;
    this.saharControlValues.sort = this.sort;
  }

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.saharControl.msg) {
      const list: any = {};
      if (item.AuditorName) {
        list['نام حسابرس'] = item.AuditorName;
      }
      if (item.CustomerName) {
        list['نام شرکت'] = item.CustomerName;
      }
      if (item.CustomerNationalID) {
        list['شناسه ملی'] = item.CustomerNationalID;
      }
      if (item.DurationDateEnd) {
        list['پایان سال مالی'] = item.DurationDateEnd;
      }
      if (item.LastYear) {
        list['سال قبلی'] = item.LastYear;
      }
      if (item.AvgHAmount) {
        list['مبلغ قرارداد'] = item.AvgHAmount;
      }
      if (item.LastAmount) {
        list['مبلغ قرارداد قبلی'] = item.LastAmount;
      }
      if (item.LastAuditor) {
        list['حسابرس قبلی'] = item.LastAuditor;
      }
      if (item.amount) {
        list['نرخ ساعتی'] = item.amount;
      }
      if (item.ActivityName) {
        list['نوع خدمت'] = item.ActivityName;
      }
      if (item.StatusName) {
        list[' وضعیت'] = item.StatusName;
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of report');
  }
}

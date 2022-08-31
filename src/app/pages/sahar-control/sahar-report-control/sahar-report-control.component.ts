import {Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {first} from 'rxjs/operators';
import {
  AcceptProvisionalComponentTwe
} from './modal/accept-provisional/accept-provisional.component';
import {UnAcceptComponentTwe} from './modal/un-accept/un-accept.component';
import {
  PdfAuditorContractReportComponent
} from '../../sahar/auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sahar-report-control',
  templateUrl: './sahar-report-control.component.html',
  styleUrls: ['./sahar-report-control.component.scss']
})
export class SaharReportControlComponent implements OnDestroy{
  dataValues: any;
  saharReport: any;
  saharReportPage!: MatTableDataSource<any>;
  active!: boolean;
  params: any;
  name!: string;
  pageNumber = 1;
  dates: any = {};
  columnsToDisplay = [
    'CustomerName',
    'NationalID',
    'ActivityNAme',
    'DurationDate',
    'OpinionName',
    'ActionDateSign',
    'operation'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetSaharReport(true);
      } else {
        this.ngGetSaharReport(false);
      }
    });
  }

  base64ToArrayBuffer(base64: string): any {
    let binarystring = base64.replace(/\\n/g, '');
    binarystring =  window.atob(base64);
    const len = binarystring.length;
    const bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
      bytes[i] = binarystring.charCodeAt(i);
    }
    return bytes.buffer;
  }

  ngGetSaharReport(state: boolean): void {
    const data: any = {};
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
      data.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getSaharReport(data).subscribe((saharReport) => {
      if (saharReport.msg) {
        this.dataValues = saharReport;
        this.saharReportPage = new MatTableDataSource<any>(this.dataValues.msg);
        this.saharReportPage.paginator = this.paginator;
        this.saharReport = this.saharReportPage.connect();
      }
    });
  }

  sortData(sort: Sort): void {
    const data = this.saharReportPage.data.slice();
    if (!sort.active || sort.direction === '') {
      this.saharReportPage = new MatTableDataSource<any>(data);
      return;
    }
    this.saharReportPage = new MatTableDataSource<any>(
      data.sort((a: any, b: any) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'CustomerName': return compare(a.FirmCode, b.FirmCode, isAsc);
          case 'NationalID': return compare(a.AuditorName, b.AuditorName, isAsc);
          case 'AuditorName': return compare(a.SessionName, b.SessionName, isAsc);
          case 'ActivityNAme': return compare(a.TotalAmount, b.TotalAmount, isAsc);
          case 'DurationDateEnd': return compare(a.StatusName, b.StatusName, isAsc);
          case 'ActionDateSign': return compare(a.StatusName, b.StatusName, isAsc);
          default: return 0;
        }
      })
    );
    this.saharReportPage.paginator = this.paginator;
    this.saharReport = this.saharReportPage.connect();
  }

  ngChangeStatus(item: any, status: any): void {
    if (confirm('قرارداد را تایید می کنید ؟')) {
      const data = {
        FirmReportGcode: item.GCode,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        StatusGCode: status,
        UniqueGUID: item.UniqueGUID,
        action: 1,
      };
      this.callData.saharReportAccept(data)
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
            this.ngGetSaharReport(false);
            // this.saharReportPage.filteredData.splice(this.saharReportPage.filteredData.findIndex(val =>
            //   val.GCode === item.GCode), 1);
            // this.saharReportPage = new MatTableDataSource<any>(this.saharReportPage.filteredData);
            // this.saharReportPage.paginator = this.paginator;
            // this.saharReport = this.saharReportPage.connect();
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

  ngUnChangeStatus(GCode: string): void {
    const dialogRef = this.dialog.open(UnAcceptComponentTwe,
        {
          width: '650px',
          data: {GCode}
        });
    dialogRef.afterClosed().subscribe(result => {
      this.saharReportPage.filteredData.splice(this.saharReportPage.filteredData.findIndex(val =>
        val.GCode === GCode), 1);
      this.saharReportPage = new MatTableDataSource<any>(this.saharReportPage.filteredData);
      this.saharReportPage.paginator = this.paginator;
      this.saharReport = this.saharReportPage.connect();
    });
  }

  ngProvisionalChangeStatus(item: any): void {
    const dialogRef = this.dialog.open(AcceptProvisionalComponentTwe,
      {
        width: '650px',
        data: {
          FirmReportGcode: item.GCode,
          UniqueGUID: item.UniqueGUID,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      this.saharReportPage.filteredData.splice(this.saharReportPage.filteredData.findIndex(val =>
        val.GCode === item.GCode), 1);
      this.saharReportPage = new MatTableDataSource<any>(this.saharReportPage.filteredData);
      this.saharReportPage.paginator = this.paginator;
      this.saharReport = this.saharReportPage.connect();
    });
  }

  ngGetPdf(item: any): void {
    if (item.pdf) {
      this.ngOpenModal(item.pdf, item);
    } else {
      const data = {
        GCode: item.GCode,
        status: 10
      };
      this.callData.getSaharPDF(data).subscribe( res => {
        item.pdf = res;
        this.ngOpenModal(res, item);
      });
    }
  }

  ngOpenModal(pdf: any, item: any): void {
    const pdfConvertor = this.base64ToArrayBuffer(pdf);
    this.dialog.open(PdfAuditorContractReportComponent, {
      data: {data: item, pdf: pdfConvertor},
      height: '90vh0',
      width: '800px'
    });
  }

  ngSearch(name: string): void {
    this.router.navigate(['SaharControl/IacpaReportControl', 1, name]);
    // name = name.trim();
    // name = name.toLowerCase();
    // this.saharReportPage.filter = name;
  }

  filterDate(date: any): void {
    this.saharReportPage.disconnect();
    this.saharReportPage = new MatTableDataSource<any>(this.dataValues.msg.filter((
      values: any) => Number(values.ActionDateSign) >= Number(date.one) && Number(values.ActionDateSign) <= Number(date.twe)
    ));
    this.saharReportPage.paginator = this.paginator;
    this.saharReport = this.saharReportPage.connect();
  }

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.dataValues.msg) {
      const list: any = {};
      if (item.CustomerName) {
        list['نام شرکت'] = item.CustomerName;
      }
      if (item.NationalID) {
        list['شناسه ملی'] = item.NationalID;
      }
      if (item.AuditorName) {
        list['نام حسابرس'] = item.AuditorName;
      }
      if (item.ActivityNAme) {
        list['نوع گزارش'] = item.ActivityNAme;
      }
      if (item.DurationDateEnd) {
        list['پایان سال مالی'] = item.DurationDateEnd;
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of report');
  }

  ngOnDestroy(): void {
    if (this.saharReportPage) {
      this.saharReportPage.disconnect();
    }
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean): any {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

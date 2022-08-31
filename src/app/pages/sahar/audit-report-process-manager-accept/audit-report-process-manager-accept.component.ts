import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {PdfAuditorContractReportComponent} from '../auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CallDataService } from 'src/app/services/sahar/call-data.service';

@Component({
  selector: 'app-audit-report-process-manager-accept',
  templateUrl: './audit-report-process-manager-accept.component.html',
  styleUrls: ['./audit-report-process-manager-accept.component.scss']
})
export class AuditReportProcessManagerAcceptComponent implements OnInit {
  reports: any[] = [];
  active = false;
  activeReport = false;
  columnsToDisplay = [
    'CustomerName',
    'NationalID',
    'ActivityNAme',
    'DurationDate',
    'OpinionName',
    'operation'
  ];

  constructor(private callData: CallDataService,  private snackBar: MatSnackBar, private dialog: MatDialog) { }

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

  ngOnInit(): void {
    this.ngGetReport();
  }

  ngGetReport(): void {
    const data = {
      FirmInfoAuditGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getSingReports(data).subscribe((res) => {
      if (res.msg) {
        this.reports = res.msg;
        this.active = true;
      }
    });
  }

  ngChangeStatus(item: any, activeStatus: boolean): void {
    let StatusGcode = 0;
    if (item.SignIndex === 1 && !activeStatus) {
      StatusGcode = 11;
    } else if (item.SignIndex === 1 && activeStatus)  {
      StatusGcode = 21;
    } else if (item.SignIndex === 2 &&  !activeStatus) {
      StatusGcode = 12;
    } else {
      StatusGcode = 22;
    }

    const data = {
      action: '4',
      StatusGcode,
      FirmReportGcode : item.GCode,
      UserGcode: item.SignIndex,
      GCode: item.FirmReportSignGCode,
    };

    if (confirm('برای تایید این گزاریش اطمینان دارید ؟')) {
      this.callData.changeStatusReport(data)
          .pipe(first())
          .subscribe(updateContract => {
            if (updateContract.state) {
              this.snackBar.open(updateContract.msg, 'x', {
                duration: 10000,
                direction: 'rtl',
                verticalPosition: 'top',
                horizontalPosition: 'start',
                panelClass: 'panel-success'
              });
              this.ngGetReport();
            } else {
              this.snackBar.open(updateContract.msg, 'x', {
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

  ngShowReportInfo(): void {
    this.activeReport = !this.activeReport;
  }
}

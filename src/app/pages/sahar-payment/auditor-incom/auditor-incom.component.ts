import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {AuditorIncomAddComponent} from '../auditor-incom-add/auditor-incom-add.component';
import {AuditorIncomAddDetialComponent} from '../auditor-incom-add-detial/auditor-incom-add-detial.component';
import {PdfAuditorContractReportComponent} from '../../sahar/auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {timeout} from 'rxjs/operators';
import {AuditorIncomAddFile169Component} from '../auditor-incom-add-file169/auditor-incom-add-file169.component';
@Component({
  selector: 'app-auditor-incom',
  templateUrl: './auditor-incom.component.html',
  styleUrls: ['./auditor-incom.component.scss']
})
export class AuditorIncomComponent {
  @ViewChild('link') link !: ElementRef;
  incomeData: any;
  excelDat: any = {};
  columnsToDisplay = [
    'row',
    'Name',
    'Amount',
    'op',
  ];
  constructor(private callData: CallDataService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.ngFirmIncomeData();
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

  ngFirmIncomeData(): void {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.firmIncomeData(data).subscribe(res => {
      this.incomeData = res.msg;
    });
 }

  updateFirmIncomeHeader(item?: any): void {
    const dialogRef = this.dialog.open(AuditorIncomAddComponent,
      {
        width: '650px',
        data: item ? item : false,
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngFirmIncomeData();
    });
  }

  updateFirmIncomeDetail(item: any, element?: any): void {
    if (element) {
      element.FirmIncomeHdrGcode = item.GCode;
    }
    const dialogRef = this.dialog.open(AuditorIncomAddDetialComponent,
      {
        width: '650px',
        data: {GCode: item.GCode, element: element ? element : false},
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngFirmIncomeData();
    });
  }

  ngGetData(item: any): void {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      MasterCode: item.GCode
    };
    this.callData.firmIncomeData(data).subscribe(res => {
      item.data = res.msg;
      this.firmIncomeFile(item);
    });
  }

  ngGetPdf(item: any): void {
    if (item.pdf) {
      this.ngOpenModal(item.pdf, item);
    } else {
      const data = {
        FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        MasterCode: item.GCode,
      };
      this.callData.FirmIncomeFile(data, 'ezharnameh').subscribe( res => {
        item.pdf = res;
        this.ngOpenModal(res, item);
      });
    }
  }

  ngOpenModal(pdf: any, item: any): void {
    const pdfConvertor = this.base64ToArrayBuffer(pdf);
    this.dialog.open(PdfAuditorContractReportComponent, {
      data: {data: item,  pdf: pdfConvertor},
      height: '90vh0',
      width: '800px'
    });
  }

  firmIncomeFile(item: any): void {
      this.excelDat = {};
      const data = {
        FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        MasterCode: item.GCode,
      };
      this.callData.FirmIncomeFile(data, 'report').subscribe(  (res) => {
        if (!res) {
          return;
        }
        item.FIle169 = {
          extension: res.extension,
          file: res.file,
        };
      });
  }

  ngGetFile169(item: any): void {
    if (!item.FIle169) {
      this.excelDat = false;
      return;
    }
    this.excelDat = {
      extension: item.FIle169.extension,
      file: item.FIle169.file,
    };
    if (this.excelDat.file && this.excelDat.extension) {
      setTimeout(() => {
        const el = this.link.nativeElement as HTMLElement;
        el.click();
      }, 1000);
    }
  }

  onSubmit(GCode: string): void {
    if (confirm('برای انجام این عملیات اطمینان دارید ؟')) {
      const data = {
        GCode,
        StatusGCode: 20,
        Action: 2
      };
      const fileToUpload = new FormData();
      fileToUpload.append('formData', JSON.stringify(data));
      this.callData.updateFirmIncomeHeader(fileToUpload).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.ngFirmIncomeData();
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

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.incomeData ) {
      const list: any = {};
      if (item.FirmCode) {
        list['کد موسسه'] = item.FirmCode;
      }
      if (item.AuditorName) {
        list['نام موسسه'] = item.AuditorName;
      }
      if (item.SessionName) {
        list['فصل '] = item.SessionName;
      }
      if (item.TotalAmount) {
        list['مبلغ کل فصل'] = item.TotalAmount;
      }
      if (item.StatusName) {
        list['وضعیت '] = item.StatusName;
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of report');
  }

  ngAddFile169(item: any): void {
    const dialogRef = this.dialog.open(AuditorIncomAddFile169Component,
      {
        width: '650px',
        data: item.FileReport ? 2 : 1,
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngFirmIncomeData();
    });
  }
}

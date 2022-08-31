import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  PdfAuditorContractReportComponent
} from '../../../../../auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CallDataService } from 'src/app/services/sahar/call-data.service';
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements  AfterViewInit {
  params: any;
  pdfFile: any;
  reportInfo: any;
  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png',
    maxSize: '10',
    theme: 'dragNDrop',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false
  };
  formData: any = {};
  reportForms: any;
  fileData!: File;
  previewUrl: any = null;
  Gcode!: number;
  saveValue = '';
  countMember!: number;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute) {}

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

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.getSingleReports();
      this.ngReportForm();
    });
  }

  ngGetReports(): void  {
    if (!this.pdfFile) {
      const data = {
        GCode: this.params.get('id'),
        status: this.params.get('status')
      };
      this.callData.getSaharPDF(data).subscribe((res) => {
        this.pdfFile = this.base64ToArrayBuffer(res);
        this.ngOpenModal(this.pdfFile);
      });
    } else {
     this.ngOpenModal(this.pdfFile);
    }
  }

  ngOpenModal(pdfVal: string): void {
    this.dialog.open(PdfAuditorContractReportComponent, {
      height: '90vh0',
      width: '800px',
      data: {data: this.reportInfo, pdf: pdfVal },
    });
  }

  getSingleReports(): void  {
    const url = location.href.split('/')[5];
    const data = {
      GCode: url,
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.saharReports(data).subscribe((res) => {
      this.reportInfo = res.msg[0];
      this.formData = {
        GCode: this.reportInfo.GCode,
        StatementDate: this.reportInfo.StatementDate,
        AuditReportDate: this.reportInfo.AuditReportDate,
        AuditReportSendDate: this.reportInfo.AuditReportSendDate,
        GnrAuditOpinionGCode: this.reportInfo.GnrAuditOpinionGCode,
        SignCount: this.reportInfo.SignCount,
        UserSign1: this.reportInfo.UserSign1,
        StatusGCode: this.reportInfo.StatusGCode,
        WorkEndDate: this.reportInfo.WorkEndDate,
        WorkStartDate: this.reportInfo.WorkStartDate,
        FinalAmount: this.reportInfo.FinalAmount,
        FinalTime: this.reportInfo.FinalTime,
      };
      if (this.reportInfo.SignCount === 2) {
        this.formData.UserSign2 = this.reportInfo.UserSign2;
      }
      this.countMember = this.reportInfo.SignCount;
    });
  }

  ngReportForm(): void  {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getFormReport(data).subscribe((res) => {
      this.reportForms = res.msg;
    });
  }

  fileProgress(fileInput: any): void {
    if (fileInput.files[0].size > 10000000) {
      this.snackBar.open('حداکثر حجم آپلود فایل 10 مگابایت است.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }
    this.fileData = fileInput.files[0];
    this.preview();
  }

  preview(): void  {
    const mimeType = this.fileData.type;

    if (mimeType.match(/pdf\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  checkValue(name: string, item: any): void  {
    if (name === 'SignCount') {
      this.countMember = item.value;
      if (this.countMember === 1) {
        delete this.formData.UserSign2;
      }
    }
    this.saveValue = item.value;
  }

  onSubmit(): void  {
    const fileToUpload = new FormData();
    this.formData.action = 2;
    this.formData.LoactionGcode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    if (this.fileData) {
      fileToUpload.append('file', this.fileData, this.fileData.name);
      fileToUpload.append('formData', JSON.stringify(this.formData));
      this.callData.addReport(fileToUpload).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.router.navigate(['Sahar/AuditReportProcess']);
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
    } else {
      this.snackBar.open('لطفا فایل pdf خود را آپلود کنید', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  dateMode(value: string, name: string): void  {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

import { Component } from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PdfAuditorContractReportComponent} from '../../sahar/auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent {
  reportsList: any;
  reportsListDes: any;
  active = false;
  pdfFile: any;
  fileData!: File;
  previewUrl: any = null;
  formData: any = {};
  columnsToDisplay = [
    'row',
    'Name',
    'NationalId',
    'DurationDateStart',
    'DurationDateEnd',
    'StatusName',
    'operation'
  ];
  constructor(private callData: CallDataService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.getUpdatePDF();
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

  getUpdatePDF(): void {
    const data = {Kind: 'E4'};
    this.callData.UpdatePDF(data).subscribe(res => {
      this.reportsList = res.msg;
      this.active = true;
    });
  }

  getUpdatePDFDes(GCode: string): void {
    const data = {Kind: 'E2', MasterCode: GCode, newPDF: true};
    this.callData.UpdatePDF(data).subscribe((res) => {
      this.reportsListDes = res;
      this.ngOpenModal(this.reportsListDes);

      this.active = true;
    });
  }


  ngOpenModal(pdf: any): void {
    const pdfConvertor = this.base64ToArrayBuffer(pdf);
    this.dialog.open(PdfAuditorContractReportComponent, {
      data: pdfConvertor,
      height: '90vh0',
      width: '800px'
    });
  }

  fileProgress(fileInput: any): void {
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

  onSubmit(dataVal: any): void  {
    const fileToUpload = new FormData();
    this.formData.Kind = 'E3';
    this.formData.MasterCode = dataVal;
    if (this.formData) {
      fileToUpload.append('file', this.fileData, this.fileData.name);
      fileToUpload.append('formData', JSON.stringify(this.formData));
      this.callData.updateReports(fileToUpload).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.getUpdatePDF();
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

}

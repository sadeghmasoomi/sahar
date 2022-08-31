import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-auditor-contract-report',
  templateUrl: './pdf-auditor-contract-report.component.html',
  styleUrls: ['./pdf-auditor-contract-report.component.scss']
})
export class PdfAuditorContractReportComponent {
  pdfFile: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PdfAuditorContractReportComponent>) {
    this.pdfFile = data.pdf;

  }

  onNoClick(): void {
    this.pdfFile = '';
    this.dialogRef.close();
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-auditor-incom-add',
  templateUrl: './auditor-incom-add.component.html',
  styleUrls: ['./auditor-incom-add.component.scss']
})
export class AuditorIncomAddComponent {
  formData: any = {};
  fileDataXlsx!: File;
  fileDataPdf!: File;
  file: any;
  previewUrl: any = null;
  forms: any;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar, public dialogRef: MatDialogRef<AuditorIncomAddComponent>) {
    this.getFirmIncomeHeaderFormData();
    if (data) {
      this.formData = {
        GCode: data.GCode,
        YearSessionGCode: data.YearSessionGCode,
        TotalAmount: data.TotalAmount,
      };
    }
  }

  getFirmIncomeHeaderFormData(): void {
    this.callData.getFirmIncomeHeaderFormData().subscribe(res => {
     this.forms = res.msg;
    });
  }

  fileProgressPdf(fileInput: any): void {
    if (fileInput.files[0].type.match(/pdf\/*/) == null) {
      this.snackBar.open('فرمت فایل نامعتبر است.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }
    this.fileDataPdf = fileInput.files[0] as File;
    this.previewPdf();
  }

  previewPdf(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileDataPdf);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  fileProgressXlsx(fileInput: any): void {
    const text = 'فرمت فایل نامعتبر است.';
    if (fileInput.files[0].type === 'application/vnd.ms-excel') {
      if (fileInput.files[0].type.match(/vnd.ms-excel\/*/) == null) {
        this.snackBar.open(text, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
        return;
      }
    } else {
      if ( fileInput.files[0].type.match(/vnd.openxmlformats-officedocument.spreadsheetml.sheet\/*/) == null) {
        this.snackBar.open(text, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
        return;
      }
    }
    this.fileDataXlsx = fileInput.files[0] as File;
    this.previewXlsx();
  }

  previewXlsx(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileDataXlsx);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit(action: number): void {
    const fileToUpload = new FormData();
    this.formData.Action = action;
    this.formData.FileReport = null;
    this.formData.FRExtention = null;
    this.formData.FRStatusGCode = null;
    this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    if (this.fileDataPdf) {
      // fileToUpload.append('FileReport', this.fileDataXlsx, this.fileDataXlsx.name);
      fileToUpload.append('EzharNameh', this.fileDataPdf, this.fileDataPdf.name);
      fileToUpload.append('formData', JSON.stringify(this.formData));
      this.callData.updateFirmIncomeHeader(fileToUpload).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.onNoClick();
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
      this.snackBar.open('لطفا اضهارنامه و فایل pdf خود را آپلود کنید', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CallDataService} from '../../../../../../../services/sahar/call-data.service';
@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  formData: any = {};
  reportForms: any;
  fileData!: File;
  file: any;
  previewUrl: any = null;
  Gcode!: string;
  saveValue = '';
  countMember!: number;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.Gcode = window.location.href.split('/')[window.location.href.split('/').length - 2];
    this.ngReportForm();
  }

  ngReportForm(): void {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getFormReport(data).subscribe((res) => {
      this.reportForms = res.msg;
      this.formData.FirmContractGcode = this.Gcode;
    });
  }

  fileProgress(fileInput: any): void {
    this.fileData = fileInput.files[0] as File;
    this.preview();
  }


  preview(): void {
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

  checkValue(name: string, item: any): void {
    if (name === 'SignCount') {
      this.countMember = item.value;
    }
    this.saveValue = item.value;
  }

  onSubmit(): void {
    const fileToUpload = new FormData();
    this.formData.action = 1;
    this.formData.LoactionGcode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    if (this.fileData) {
      fileToUpload.append('file', this.fileData, this.fileData.name);
      fileToUpload.append('formData', JSON.stringify(this.formData));
      this.callData.addReport(fileToUpload).subscribe((res: any) => {
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
      this.snackBar.open('لطفا فایل pdf خود را آآلود کنید', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

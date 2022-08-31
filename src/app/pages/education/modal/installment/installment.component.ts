import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EducationService} from '../../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.scss']
})
export class InstallmentComponent implements OnInit {
  formData: any = {};
  active = false;
  datePickerConfig = {
    format: 'jYYYYjMMjDD'
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<InstallmentComponent>,
              private callData: EducationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (Object.keys(this.data).length > 1) {
      this.active = true;
      this.formData = {
        Gcode: this.data.Gcode,
        TrainProgAccessGcode: this.data.GcodeFather,
        JDate: this.data.JDate,
        Amount: this.data.Amount,
      };
    } else {
      this.formData.TrainProgAccessGcode = this.data.Gcode;
    }
  }

  ngOptionInstallmen(action: any): void {
    if (Object.keys(this.formData).length > 0) {
      this.formData.action = action;
      this.callData.optionInstallment(this.formData).subscribe((res: any) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.formData = {};
          this.dialogRef.close();
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
      this.snackBar.open('فرم خالی می باشد', 'x', {
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

  dateMode(value: string , name: string): void {
    const val = value.replace('/', '');
    const val2 = val.replace('/', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

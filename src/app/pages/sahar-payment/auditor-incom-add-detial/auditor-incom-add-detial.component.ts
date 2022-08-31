import {Component, Inject} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-auditor-incom-add-detial',
  templateUrl: './auditor-incom-add-detial.component.html',
  styleUrls: ['./auditor-incom-add-detial.component.scss']
})
export class AuditorIncomAddDetialComponent {
  formData: any = {};
  forms: any;
  constructor(private callData: CallDataService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AuditorIncomAddDetialComponent>,
              private snackBar: MatSnackBar) {
    this.getFirmIncomeDetailFormData();
    if (data.element) {
      this.formData = {
        GCode: data.element.GCode,
        GnrActivityKindGcode: data.element.GnrActivityKindGcode,
        Amount: data.element.Amount,
      };
    }
  }

  getFirmIncomeDetailFormData(): void {
    this.callData.getFirmIncomeDetailFormData().subscribe(res => {
      this.forms = res.msg;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(action: number): void {
    this.formData.FirmIncomeHdrGcode = this.data.GCode;
    this.formData.Action = action;
    this.callData.updateFirmIncomeDetail(this.formData).subscribe(res => {
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
  }
}

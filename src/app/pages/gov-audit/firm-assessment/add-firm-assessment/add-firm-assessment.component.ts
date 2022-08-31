import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CallDataService} from '../../../../services/govAudit/call-data.service';

@Component({
  selector: 'app-add-firm-assessment',
  templateUrl: './add-firm-assessment.component.html',
  styleUrls: ['./add-firm-assessment.component.scss']
})
export class AddFirmAssessmentComponent {
  formData: any = {};
  forms: any;
  citeies: any = [];
  provinces!: [];
  editActive = false;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CallDataService>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
    this.ngGetForm();
  }

  selectProvinces(value: any): void {
    this.citeies = value;
  }

  ngGetForm(): void {
    this.callData.CoInfoForm().subscribe((res) => {
      this.forms = res.msg;
      if (this.data) {
        this.formData = this.data;
        this.editActive = true;
        for (const sub of this.forms) {
          if (sub.enName === 'provinces') {
            this.provinces = sub.data.find((element: any) => element.name === this.data.provinces).citeies;
            this.selectProvinces(this.provinces);
          }
        }
      }
    });
  }

  operation(action: any): void {
    this.formData.action = action;
    this.callData.CoInfoUpdate(this.formData).subscribe( (res) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
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
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

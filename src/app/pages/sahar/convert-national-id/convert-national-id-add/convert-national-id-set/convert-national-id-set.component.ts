import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CallDataService} from '../../../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-convert-national-id-set',
  templateUrl: './convert-national-id-set.component.html',
  styleUrls: ['./convert-national-id-set.component.scss']
})
export class ConvertNationalIdSetComponent {
  formData: any = {};
  constructor(public callData: CallDataService, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ConvertNationalIdSetComponent>, public snackBar: MatSnackBar) {
    this.formData = this.data;
    this.formData.Action = 1;
    this.formData.locationGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
  }

  addCustomer(): void {
    if (!this.formData.Organization && !this.formData.Comment) {
      this.snackBar.open('لطفا تمامی فیلد ها را پر کیند.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }

    this.callData.customerInfoOldUpdate(this.formData).subscribe((res) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.onNoClick(true);
      }
    });
  }

  onNoClick(data: boolean): void {
    this.dialogRef.close(data);
  }

}

import {Component, Inject} from '@angular/core';
import {CallDataService} from '../../../../../services/sahar/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-accept-provisional',
  templateUrl: './accept-provisional.component.html',
  styleUrls: ['./accept-provisional.component.scss']
})
export class AcceptProvisionalComponentTwe {

  comment!: string;
  active = false;
  constructor(@Inject(MAT_DIALOG_DATA) public acceptProvisiona: any,
              public dialogRef: MatDialogRef<AcceptProvisionalComponentTwe>,
              private callData: CallDataService,
              private snackBar: MatSnackBar) { }

  ngProvisionalChangeStatus(comment: string): void {
    if (confirm('قرارداد را تایید مشروط می کنید ؟')) {
      const data = {
        FirmReportGcode: this.acceptProvisiona.FirmReportGcode,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        StatusGCode: '42',
        UniqueGUID: this.acceptProvisiona.UniqueGUID,
        Comment: comment,
        action: 1,
      };
      this.active = true;
      this.callData.saharReportAccept(data)
          .subscribe(updateSaharConrol => {
            if (updateSaharConrol.state) {
              this.snackBar.open(updateSaharConrol.msg, 'x', {
                duration: 10000,
                direction: 'rtl',
                verticalPosition: 'top',
                horizontalPosition: 'start',
                panelClass: 'panel-success'
              });
              this.active = false;
              this. onNoClick();
            } else {
              this.snackBar.open(updateSaharConrol.msg, 'x', {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}

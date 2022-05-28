import {Component, Inject} from '@angular/core';
import {CallDataService} from '../../../../../services/sahar/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-un-accept',
  templateUrl: './un-accept.component.html',
  styleUrls: ['./un-accept.component.scss']
})
export class UnAcceptComponentTwe{

  comment!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public acceptData: any,
              public dialogRef: MatDialogRef<UnAcceptComponentTwe>,
              private callData: CallDataService,
              private snackBar: MatSnackBar) {  }

  ngUnChangeStatus(comment: string): void {
    if (confirm('قرارداد را تایید نمی کنید ؟')) {
      const data = {
        FirmReportGcode: this.acceptData.GCode,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        StatusGCode: '41',
        Comment: comment,
        action: 1,
      };
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
              this.onNoClick();
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

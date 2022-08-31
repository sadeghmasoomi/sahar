import {Component, Inject} from '@angular/core';
import {first} from 'rxjs/operators';
import {CallDataService} from '../../../../../services/sahar/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-acsept-provisional',
  templateUrl: './acsept-provisional.component.html',
  styleUrls: ['./acsept-provisional.component.scss']
})
export class AcceptProvisionalComponent {
  comment!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public acceptProvisiona: any,
              public dialogRef: MatDialogRef<AcceptProvisionalComponent>,
              private callData: CallDataService,
              private snackBar: MatSnackBar) { }


  ngProvisionalChangeStatus(comment: string): void {
    if (confirm('قرارداد را تایید مشروط می کنید ؟')) {
      const data = {
        FirmContractGcode: this.acceptProvisiona.GCode,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        StatusGCode: '42',
        Comment: comment,
        action: 1,
      };
      this.callData.saharControlAccept(data)
        .pipe(first())
        .subscribe(updateSaharConrol => {
          if (updateSaharConrol.state) {
            this.snackBar.open(updateSaharConrol.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
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

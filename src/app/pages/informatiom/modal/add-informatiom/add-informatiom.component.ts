import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InformatiomService} from '../../../../services/Informatiom/informatiom.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-informatiom',
  templateUrl: './add-informatiom.component.html',
  styleUrls: ['./add-informatiom.component.scss']
})
export class AddInformatiomComponent implements OnInit {
  formData: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddInformatiomComponent>,
              private snackBar: MatSnackBar,
              private informatiom: InformatiomService) { }

  ngOnInit(): void {
  }

  ngAddInformatiom(): void {
    const data = {
      GCode: this.data.GCode,
      CoInfoGCode: this.data.CoInfoGCode,
      FirmContractGCode: this.data.FirmContractGCode,
      FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      Operatingincome: this.formData.Operatingincome,
      Totalassets: this.formData.Totalassets,
      RecivedIncome: this.formData.RecivedIncome,
      Action: 1,
    };
    this.informatiom.apiMakerPost(data, 'getInfoUpdate').subscribe( res => {
      if (!res.state) {
        this.snackBar.open('لطفا تاریخ ورود را وارد کنید', 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
        return;
      }
      this.snackBar.open(res.msg, 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-success'
      });
      this.onNoClickFun(true);
    });
  }

  onNoClickFun(value: boolean): void {
    this.dialogRef.close(value);
  }
}

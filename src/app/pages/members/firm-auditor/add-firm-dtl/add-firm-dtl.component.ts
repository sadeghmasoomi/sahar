import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-firm-dtl',
  templateUrl: './add-firm-dtl.component.html',
  styleUrls: ['./add-firm-dtl.component.scss']
})
export class AddFirmDtlComponent implements OnInit {
  firms: any;
  addForm: any;
  formData: any = {};
  edit!: boolean;
  datePickerConfig = {
    format: 'jYYYYjMMjDD'
  };
  constructor(@Inject(MAT_DIALOG_DATA) public dataAccept: any,
              public dialogRef: MatDialogRef<AddFirmDtlComponent>,
              private callData: CallDataMembersService,
              private snackBar: MatSnackBar) {
    if (dataAccept.element) {
      this.formData = this.dataAccept.element;
      this.edit = true;
    }
  }

  ngOnInit(): void {
    this.ngGetFirmDetailsForm();
  }

  ngAddFirmDtl(data: any, action: number): void {
    data.action = action;
    if (action === 1) {
      data.FirmInfoHdrGCode = this.dataAccept.GCode;
    }
    this.callData.firmInfoDtl(data).subscribe((res) => {
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

  ngGetFirmDetailsForm(): void {
    this.callData.getFirmDetailsForm().subscribe((res) => {
        this.addForm = res.msg;
    });
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

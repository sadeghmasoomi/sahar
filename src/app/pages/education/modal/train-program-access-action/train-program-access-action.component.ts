import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EducationService} from '../../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CallDataMembersService} from '../../../../services/members/call-data.service';

@Component({
  selector: 'app-train-program-access-action',
  templateUrl: './train-program-access-action.component.html',
  styleUrls: ['./train-program-access-action.component.scss']
})
export class TrainProgramAccessActionComponent implements OnInit {
  formData: any = {};
  active = false;
  users: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TrainProgramAccessActionComponent>,
              private callData: EducationService,
              private snackBar: MatSnackBar,
              private callMemberData: CallDataMembersService) {
    this.getUserGroupRank();
  }

  ngOnInit(): void  {
    if (this.data) {
      if (Object.keys(this.data).length > 1) {
        this.active = true;
      }
      if (this.data.data) {
        this.formData = {
          GCode: this.data.data.Gcode,
          UserGroupRankGcode: this.data.data.UserGroupRankGcode,
          Score: this.data.data.Score,
          DepositID: this.data.data.DepositID,
          ISCredit: this.data.data.IsCredit,
          IsmanyLesson: this.data.data.IsmanyLesson,
          IsmanyAddress: this.data.data.IsmanyAddress,
          IsRegister: this.data.data.IsRegister,
          Amount: this.data.data.Amount,
          MaxFirmRegister: this.data.data.MaxFirmRegister,
          StatusGcode: this.data.data.StatusGcode,

        };
      }
    }
  }

  ngOptionTrainAccess(action: number): void {
    if (Object.keys(this.formData).length > 0) {
      this.formData.action = action;
      this.formData.StatusGcode = 1;
      this.formData.TrainProgramGCode = this.data.TrimGcode;
      this.callData.trainProgramAccessAction(this.formData).subscribe((res: any) => {
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

  getUserGroupRank(): void  {
    this.callMemberData.getUserGroupRank().subscribe(user => {
      this.users = user.msg.data;
    });
  }

}

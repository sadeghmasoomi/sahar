import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EducationService} from '../../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edite-education',
  templateUrl: './edite-education.component.html',
  styleUrls: ['./edite-education.component.scss']
})

export class EditEducationComponent implements OnInit {
  formData: any = {};
  active = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditEducationComponent>,
              private callData: EducationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data) {
      this.active = true;
      this.formData = {
        GCode: this.data.Gcode,
        Code: this.data.Code,
        Name: this.data.CouseName,
        TrainCourseTypeGcode: this.data.TypeGcode,
      };
    }
  }

  ngOption(action: number): void {
    if (Object.keys(this.formData).length > 0) {
      this.formData.action = action;
      this.formData.StstusGCode = 1;
      this.callData.courseAction(this.formData).subscribe((res) => {
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

}

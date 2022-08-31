import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EducationService} from '../../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-courses-program-action',
  templateUrl: './edit-courses-program-action.component.html',
  styleUrls: ['./edit-courses-program-action.component.scss']
})
export class EditCoursesProgramActionComponent implements OnInit {
  formData: any = {};
  teachers: any;
  active = false;
  datePickerConfig = {
    format: 'jYYYYjMMjDD'
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditCoursesProgramActionComponent>,
              private callData: EducationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data) {
      if (Object.keys(this.data).length > 1) {
        this.active = true;
      }
      this.formData = {
        GCode: this.data.Gcode,
        TrainCourseGcode: this.data.courseGcode,
        RegisterDateStart: this.data.RegisterDateStart,
        RegisteDateEnd: this.data.RegisteDateEnd,
        CourseStart: this.data.CourseStart,
        CourseEnd: this.data.CourseEnd,
        CartStart: this.data.CartStart,
        CartEnd: this.data.CartEnd,
        TotalHours: this.data.TotalHours,
        TimeProgram: this.data.TimeProgram,
        Comment: this.data.Comment,
        UserGroupRankGcode: this.data.UserGroupRankGcode,
        Qty: this.data.Qty,
        StatusGCode: this.data.StatusCode,
      };
      if (this.data.TeacherUserGCode && this.data.TeacherName) {
        const techer = {
          Name:  this.data.TeacherName,
          Gcode: this.data.TeacherUserGCode,
        };
        this.ngSelectTeachers(techer);
      }
    }
  }

  ngOptionProgram(action: any): void {
    if (Object.keys(this.formData).length > 0) {
      this.formData.action = action;
      this.formData.StatusGCode = 1;
      this.callData.coursesProgramAction(this.formData).subscribe((res: any) => {
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

  getTeachers(text: string, state: boolean): void {
    const data = {
      FV1: text
    };
    data.FV1 = text;
    this.callData.getTeachers(data).subscribe((teachers) => {
      this.teachers = teachers.msg;
      if (this.active) {
        if (this.teachers[0]){
          this.ngSelectTeachers(this.teachers[0]);
        }
      }
    });
  }

  ngSelectTeachers(teacher: any): void {
    this.formData.TeacherUserName = teacher.Name;
    this.formData.TeacherUserGCode = teacher.Gcode;
  }

  dateMode(value: string , name: string): void {
    const val = value.replace('/', '');
    const val2 = val.replace('/', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

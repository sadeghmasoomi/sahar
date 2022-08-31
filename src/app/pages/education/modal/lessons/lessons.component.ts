import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EducationService} from '../../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessons: any[] = [];
  lessonsList: any;
  active = false;
  lessonForm: any;
  LessonTitle: any;
  columnsToDisplay = [
    'LessonTitle',
    'Name',
    'operation',
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<LessonsComponent>,
              private callData: EducationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ngGetLessons();
    this.getAllLessons();
  }

  ngGetLessons(): void {
    const data = {
      MasterCode: this.data
    };
    this.lessons = [];
    this.callData.getLesion(data).subscribe((lessons) => {
      if (lessons.state) {
        this.lessons = lessons.msg;
        this.active = false;
      } else  {
        this.active = true;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllLessons(): void {
    this.callData.getAllLesson().subscribe((res) => {
      this.lessonsList = res.msg;
    });
  }

  addLessonActive(): void {
    this.active = !this.active;
    if (this.active) {
      this.getAllLessons();
    }
  }

  ngAddLessons(addressGcode: any, lessonTitle: any): void {
    if (addressGcode) {
      const data = {
        TrainProgAccessGcode: this.data,
        TrainLessonGcode: addressGcode,
        action: 1,
      };
      this.callData.TrainProgAccessLessonAction(data).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.ngGetLessons();
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        }
      });
    } else {
      this.snackBar.open('تمامی فیلد ها اجباری می باشد.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  ngDelete(Gcode: any): void {
    if (confirm('آدرس  حدف شود ؟')) {
      const data = {
        GCode: Gcode,
        action: 3
      };
      this.callData.TrainProgAccessLessonAction(data).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.ngGetLessons();
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        }
      });
    }
  }
}

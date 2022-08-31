import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../../../../services/education/education.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  formData: any = {};
  active = false;
  constructor(private callData: EducationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddLessonComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void  {
    if (this.data) {
      this.formData = this.data;
      this.active =  true;
    }
  }

  ngAddLesson(data: any, action: number): void {
    if (data) {
      data.action = action;
      this.callData.trainLessonAction(data).subscribe((res) => {
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
    } else {
      this.snackBar.open('تمامی فیلد ها خالی می باشد.', 'x', {
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

import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../../services/education/education.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AddLessonComponent} from './modal/add-lesson/add-lesson.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesions',
  templateUrl: './lesions.component.html',
  styleUrls: ['./lesions.component.scss']
})
export class LesionsComponent implements OnInit {
  lessons: any[] = [];
  columnsToDisplay = [
    'Name',
    'operation',
  ];
  constructor(private callData: EducationService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ngGetLesions();
  }

  ngGetLesions(): void {
    this.callData.getAllLesson().subscribe((res) => {
      this.lessons = res.msg;
    });
  }

  ngAddLesson(): void {
    const dialogRef = this.dialog.open(AddLessonComponent,
      {
        width: '650px',
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetLesions();
    });
  }

  ngEditLesson(data: string): void {
    const dialogRef = this.dialog.open(AddLessonComponent,
      {
        width: '650px',
        data
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetLesions();
    });
  }

  ngDelete(Gcode: string): void {
    if (confirm('درس حدف شود ؟')) {
      const data = {
        Gcode,
        action: 3
      };
      this.callData.trainLessonAction(data).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.ngGetLesions();
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
  }
}

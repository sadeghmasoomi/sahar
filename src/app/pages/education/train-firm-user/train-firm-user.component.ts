import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../../services/education/education.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UsersToIntroductionComponent} from './modal/users-to-introduction/users-to-introduction.component';

@Component({
  selector: 'app-train-firm-user',
  templateUrl: './train-firm-user.component.html',
  styleUrls: ['./train-firm-user.component.scss']
})
export class TrainFirmUserComponent implements OnInit {
  introduction: any;
  introductionTable = [
    'CourseName',
    'RankName',
    'RegisterDateStart',
    'RegisteDateEnd',
    'CourseStart',
    'CourseEnd',
    'Amount',
    'Qty',
    'RemindQty',
    'MaxFirmRegister',
    'operation',
  ];

  constructor(private callData: EducationService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.ngGetIntroduction();
  }


  ngGetIntroduction(): void {
    this.callData.getIntroduction().subscribe( (res) => {
      this.introduction = res.msg;
    });
  }

  ngDes(data: any): void {
    const dialogRef = this.dialog.open(UsersToIntroductionComponent,
      {
        width: '650px',
        data
      });
  }
}

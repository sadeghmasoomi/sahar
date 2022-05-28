import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../../../../services/education/education.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-to-introduction',
  templateUrl: './users-to-introduction.component.html',
  styleUrls: ['./users-to-introduction.component.scss']
})
export class UsersToIntroductionComponent implements OnInit {
  usersToIntroduction: any[] = [];
  usersToIntroductionTable = [
    'Position',
    'Name',
    'operation',
  ];
  constructor(private callData: EducationService, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ngGetUsersToIntroduction(this.data.UserGroupRankGCode);
  }


  ngGetUsersToIntroduction(UserGroupRankGCode: any): void {
    const data = {
      FI1: UserGroupRankGCode,
    };
    this.callData.usersToIntroduction(data).subscribe( (res) => {
      this.usersToIntroduction = res.msg;
    });
  }

  ngIntroductionAction(Gcode: string): void {
    const data = {
      UserGcode: Gcode,
      TrainProgramAccessGCode: this.data.TrainProgramAccessGcode
    };
    if (confirm('کاربر معرفی شود ؟')) {
      this.callData.introductionActionFun(data).subscribe((res) => {
          if (res.state) {
            this.snackBar.open(res.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
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

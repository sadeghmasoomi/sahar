import { Component, OnInit } from '@angular/core';
import {EducationService} from '../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-train-register',
  templateUrl: './train-register.component.html',
  styleUrls: ['./train-register.component.scss']
})
export class TrainRegisterComponent implements OnInit {
  registerCourses: any;
  userCourses: any;
  userCoursesProgress: any;
  activeUser = false;
  activeReg = false;
  activeProgress = false;
  columnsToDisplay = [
    'Name',
    'RegisterDateStart',
    'RegisteDateEnd',
    'CourseStart',
    'CourseEnd',
    'Amount',
    'Qty',
    'RemindQty',
    'Address',
    'operation',
  ];
  userCoursesProgressTable = [
    'CourseName',
    'RankName',
    'CourseStart',
    'TotAmount',
    'Amount',
  ];

  constructor(private callData: EducationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ngGetUserCourses();
    this.ngRegisteredCourses();
    this.ngUnPaidCourses();
  }

  ngGetUserCourses(): void {
    this.callData.getUserCourses().subscribe((res) => {
      if (res.state) {
        this.userCourses = res.msg;
      } else {
        this.activeUser = true;
      }
    });
  }

  ngRegisteredCourses(): void {
    this.callData.RegisteredCourses().subscribe((res) => {
      if (res.state) {
        this.registerCourses = res.msg;
      } else {
        this.activeReg = true;
      }
    });
  }

  ngAddCourses(courses: any): void {
    if (confirm('میخواهم درس به لیست درس های من اضافه شود.')) {
      const data = {
        TrainProgAccessGCode: courses.TrainProgramAccessGcode,
        TrainAddressGcode: courses.AddressGCode,
        action: 1,
      };
      this.callData.UserRegister(data).subscribe((res) => {
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

  ngUnPaidCourses(): void {
    this.callData.unPaidCourses().subscribe((res) => {
      if (res.state) {
        this.userCoursesProgress = res.msg;
      } else {
        this.activeProgress = true;
      }
    });
  }
}

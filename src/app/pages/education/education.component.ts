import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../services/education/education.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {EditEducationComponent} from './modal/edite-education/edite-education.component';
import {EditCoursesProgramActionComponent} from './modal/edit-courses-program-action/edit-courses-program-action.component';
import {TrainProgramAccessActionComponent} from './modal/train-program-access-action/train-program-access-action.component';
import {AddressComponent} from './modal/address/address.component';
import {LessonsComponent} from './modal/lessons/lessons.component';
import {InstallmentComponent} from './modal/installment/installment.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  courses: any;
  coursesP: any = [];
  programAccess: any;
  params: any;
  installment: any;
  pageNumber!: number;
  pageCount!: number;
  name!: string;
  displayedColumns = [
    'InstallmentNumber',
    'Jdate',
    'Amount',
    'operation',
  ];

  constructor(private callData: EducationService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetCourses(true);
      } else {
        this.ngGetCourses(false);
      }
    });
  }

  ngGetCourses(state: boolean): void {
    this.pageNumber =  1;
    const data  = {
      pageNumber: this.pageNumber,
      name: ''
    };
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.name = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getCourses(data).subscribe((courses) => {
      this.courses = courses.msg;
      const count = courses.count / 50;
      this.pageCount = Math.round(count);
    });
  }

  pageChange(newPage: number): void {
    if (this.params.get('nameSearch')) {
      const name = this.params.get('nameSearch');
      this.router.navigate(['SaharTrain/TrainCourse', newPage, this.params.get('nameSearch')]).then(r => r);
    } else {
      this.router.navigate(['SaharTrain/TrainCourse', newPage]).then(r => r );
    }
  }

  ngSearch(name: string): void {
    this.router.navigate(['SaharTrain/TrainCourse', 1, name]);
  }

  ngGetCoursesData(Gcode: string | null): void {
    this.coursesP = [];
    const data = {
      masterCode: Gcode
    };
    this.callData.getCoursesPrograms(data).subscribe((res) => {
      if (res.state) {
        this.coursesP = res.msg;
      }
    });
  }

  ngGetProgramAccess(Gcode: string | null): void {
    this.programAccess = [];
    const data = {
      masterCode: Number(Gcode)
    };
    this.callData.getProgramAccess(data).subscribe((res) => {
      this.programAccess = res.msg;
    });
  }

  ngGetInstallment(Gcode: string): void {
    const data  = {
      MasterCode: Gcode,
    };
    this.callData.getInstallment(data).subscribe((installment) => {
     if (installment.state) {
       this.installment = installment.msg;
     }
    });
  }

  ngModalAddInstallment(Gcode: any): void {
    const dialogRef = this.dialog.open(InstallmentComponent,
      {
        width: '650px',
        minHeight: '400px',
        data: {Gcode}
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetInstallment(Gcode);
    });
  }

  ngModalInitInstallment(data: any, Gcode: any): void {
    data.GcodeFather = Gcode;
    const dialogRef = this.dialog.open(InstallmentComponent,
      {
        width: '650px',
        minHeight: '400px',
        data
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetInstallment(Gcode);
    });
  }

  ngModalAdd(): void {
    const dialogRef = this.dialog.open(EditEducationComponent,
      {
        width: '650px',
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetCourses(false);
    });
  }

  ngModalEdit(data: any): void {
    const dialogRef = this.dialog.open(EditEducationComponent,
      {
        width: '650px',
        data
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetCourses(false);
    });
  }

  ngModalAddProgram(Gcode: string): any {
    const dialogRef = this.dialog.open(EditCoursesProgramActionComponent,
      {
        width: '650px',
        data : {courseGcode: Gcode}
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetCoursesData(Gcode);
    });
  }

  ngModalAddProgramEdit(data: any, Gcode: string): void {
    const dialogRef = this.dialog.open(EditCoursesProgramActionComponent,
      {
        width: '650px',
        data: {
          ...data,
          courseGcode: Gcode
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetProgramAccess(data.Gcode);
    });
  }

  ngModalAddTrainProgram(Gcode: string): void {
    const dialogRef = this.dialog.open(TrainProgramAccessActionComponent,
      {
        width: '650px',
        data : {TrimGcode: Gcode}
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetProgramAccess(Gcode);
    });
  }

  ngModalEditTrainProgram(data: any, Gcode: string): void {
    const dataBind = {
      data,
      TrimGcode: Gcode,
    };
    const dialogRef = this.dialog.open(TrainProgramAccessActionComponent,
      {
        width: '650px',
        data: dataBind
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetProgramAccess(Gcode);
    });
  }

  openAddressList(Gcode: string): void {
    const dialogRef = this.dialog.open(AddressComponent,
      {
        width: '650px',
        data: Gcode
      });
  }

  openLessonList(Gcode: string): void {
    const dialogRef = this.dialog.open(LessonsComponent,
      {
        width: '650px',
        data: Gcode
      });
  }
}

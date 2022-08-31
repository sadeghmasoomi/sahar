import { Component } from '@angular/core';
import {CallDataService} from '../../../services/govAudit/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {AddFirmAssessmentComponent} from './add-firm-assessment/add-firm-assessment.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-firm-assessment',
  templateUrl: './firm-assessment.component.html',
  styleUrls: ['./firm-assessment.component.scss']
})
export class FirmAssessmentComponent {
  allGovAudit: any;
  govAudit: any;
  params: any;
  name!: string;
  pageNumber!: number;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  columnsToDisplay = [
    'Position',
    'Name',
    'DurationDateEnd',
  ];

  constructor(private callData: CallDataService,
              private dialog: MatDialog, private snackBar: MatSnackBar,
              private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetGovAudit(true);
      } else {
        this.ngGetGovAudit(false);
      }
    });
  }

  ngGetGovAudit(state: boolean): void {
    this.pageNumber =  1;
    const data: any = {
      Kind: 'Gov102',
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
    };
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
      data.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getGovData(data).subscribe( (res) => {
      this.govAudit = res;
      this.allGovAudit = res.msg;
    });
  }

  ngGetGovAuditData(item: any): void {
    if (!item.data) {
      const data = {
        Kind: 'Gov102D',
        MasterCode: item.GCode
      };
      this.callData.getGovData(data).subscribe( (res) => {
        item.data = res.msg;
      });
    }
  }

  addFirmAssessment(): void {
    const dialogRef = this.dialog.open(AddFirmAssessmentComponent,
      {
        width: '650px',
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetGovAudit(false);
    });
  }

  editFirmAssessment(value: any): void {
    const dialogRef = this.dialog.open(AddFirmAssessmentComponent,
      {
        width: '650px',
        data: value
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetGovAudit(true);
    });
  }

  deleteFirmAssessment(GCode: any): void {
    if (confirm('ایا برای حدف کردن آیتم اطمینان دارید')) {
      const data = {
        GCode ,
        action: 3,
      };
      this.callData.CoInfoUpdate(data).subscribe( (res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.ngGetGovAudit(true);
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

  ngSearch(name: string): void {
    this.router.navigate(['GovAudit/FirmAssessment', 1, name]);
  }
}

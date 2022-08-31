import { Component } from '@angular/core';
import {CallDataService} from '../../../services/govAudit/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
let dataCompany: any[] = [];
@Component({
  selector: 'app-firm-info-scoring',
  templateUrl: './firm-info-scoring.component.html',
  styleUrls: ['./firm-info-scoring.component.scss']
})
export class FirmInfoScoringComponent {
  displayedColumns = [
    'Name',
    'NationalID',
    'Code',
  ];
  pageNumber!: number;
  allGovAudit!: any[];
  allGovAuditSingle!: any[];
  formData: any = [];
  params: any;
  govAudit: any;
  name!: string;
  activeFirm = false;
  active = false;
  sum!: number;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetGovAudit(true);
      } else {
        this.ngGetGovAudit(false);
      }
    });
  }

  ngGetGovAudit(state: boolean): void{
    this.pageNumber =  1;
    const data: any = {
      Kind: 'Gov101'
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
      this.active = true;
      if (res.state) {
        this.govAudit = res;
        this.allGovAudit = res.msg;
        dataCompany = this.allGovAudit;
      }
    });
  }

  ngGetData(GCode: string): void {
    const data = {
      Kind: 'Gov101D',
      MasterCode: GCode
    };
    this.callData.getGovData(data).subscribe( (res) => {
      this.allGovAuditSingle = res.msg;
      for (const item of this.allGovAudit) {
        if (item.GCode === GCode) {
          item.dataValue = this.allGovAuditSingle;
        }
      }
      this.sumScore();
    });
  }


  add(): void {
    for (const item of this.allGovAuditSingle) {
      item.action = 2;
      item.FirmInfoGCode =  JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
      delete item.FirminfoGcode;
      this.callData.FirmInfoScoringUpdate(item).subscribe( (res) => {
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

  sumScore(): void {
    this.sum = 0;
    for (const item of this.allGovAuditSingle) {
      this.sum += Number(item.Score);
    }
  }

  ngSearch(name: string): void {
    this.router.navigate(['GovAudit/FirmInfoScoring', 1, name]);
  }
}

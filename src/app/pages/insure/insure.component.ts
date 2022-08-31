import { Component, OnInit } from '@angular/core';
import {CallDataService} from '../../services/govAudit/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-insure',
  templateUrl: './insure.component.html',
  styleUrls: ['./insure.component.scss']
})
export class InsureComponent {
  insure: any;
  insureData: any;
  params: any;
  name!: string;
  pageNumber!: number;
  displayedColumns = [
    'position',
    'AuditorName',
    'CustomerName',
    'CustomerNationalID',
    'LastDurationJDate',
    'StatusCode',
    'Active',
  ];
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

  ngGetGovAudit(state: boolean): void {
    this.pageNumber =  1;
    const data: any = {
      Kind: 'Insure101',
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
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
      this.insureData = res;
      this.insure = res.msg;
    });
  }

  ngChangeStatus(element: any , status: boolean): void {
    const data: any = {
      Active: status,
      AuditorCode: element.AuditorCode,
      AuditorGCode: element.AuditorGCode,
      GCode: element.GCode,
      AuditorName: element.AuditorName,
      CustomerGCode: element.CustomerGCode,
      CustomerName: element.CustomerName,
      CustomerNationalId: element.CustomerNationalID,
      FirmContractGCode: element.FirmContractGCode,
      LastDurationJDate: element.LastDurationJDate,

    };
    if (!status) {
      data.action = 3;
      data.StatusCode = 0;
    } else {
      data.action = 1;
      data.StatusCode = 1;
    }

    this.callData.insureAcceptUpdate(data).subscribe( (res) => {
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

  ngSearch(name: string): void {
    this.router.navigate(['Insure/InsureAccept', 1, name]);
  }
}

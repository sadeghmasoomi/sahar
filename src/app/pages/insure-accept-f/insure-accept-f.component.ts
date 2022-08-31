import { Component } from '@angular/core';
import {CallDataService} from '../../services/govAudit/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-insure-accept-f',
  templateUrl: './insure-accept-f.component.html',
  styleUrls: ['./insure-accept-f.component.scss']
})
export class InsureAcceptFComponent {
  name!: string;
  insure: any;
  insureData: any;
  params: any;
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
      Kind: 'Insure102',
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

  ngChangeStatus(element: any , status: any): void {
    const data: any = {
      Active: status.checked,
      AuditorCode: element.AuditorCode,
      AuditorGCode: element.AuditorGCode,
      GCode: element.GCode,
      AuditorName: element.AuditorName,
      CustomerGCode: element.CustomerGCode,
      CustomerName: element.CustomerName,
      CustomerNationalId: element.CustomerNationalID,
      FirmContractGCode: element.FirmContractGCode,
      LastDurationJDate: element.LastDurationJDate,
      action: 4
    };
    if (!status.checked) {
      data.StatusCode = 1;
    } else {
      data.StatusCode = 2;
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
    this.router.navigate(['Insure/InsureAcceptF', 1, name]);
  }
}

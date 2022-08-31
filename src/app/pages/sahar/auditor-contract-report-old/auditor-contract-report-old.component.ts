import {Component} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-auditor-contract-report-old',
  templateUrl: './auditor-contract-report-old.component.html',
  styleUrls: ['./auditor-contract-report-old.component.scss']
})
export class AuditorContractReportOldComponent {
  company: any;
  companyData: any;
  name!: string;
  columnsToDisplay = [
    'row',
    'Name',
    'DurationDate',
    'ActivityName',
    'TreatyNo',
    'amount',
    'ContractPosition',
    'ReportValid',
    'StatusName',
    'CoIsValid',
  ];
  constructor(private callData: CallDataService,  private snackBar: MatSnackBar) {}

  ngGetContract(name: string): void {
    const data: any = {
     NationalId: name,
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getCompanyData(data).subscribe( (res) => {
      this.company = res;
      this.companyData = this.company.msg;
    });
  }

  firmActivitionSet(event: any, item: any): void {
    const data = {
      FirmContractGcode: item.GCode,
      Active: event ? 1 : 0,
      Action: 2,
    };
    this.callData.firmContractActivation(data).subscribe(res => {
      this.snackBar.open(res.msg, 'x', {
        duration: 15000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-success'
      });
    });
  }

}

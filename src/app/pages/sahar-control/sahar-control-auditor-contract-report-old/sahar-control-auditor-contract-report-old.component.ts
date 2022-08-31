import { Component } from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sahar-control-auditor-contract-report-old',
  templateUrl: './sahar-control-auditor-contract-report-old.component.html',
  styleUrls: ['./sahar-control-auditor-contract-report-old.component.scss']
})
export class SaharControlAuditorContractReportOldComponent {

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
    'FirmActivition',
  ];
  constructor(private callData: CallDataService,  private snackBar: MatSnackBar) {}

  ngGetContract(name: string): void {
    const data: any = {
      NationalId: name,
      admin: true
    };
    this.callData.getCompanyData(data).subscribe( (res) => {
      this.company = res;
      this.companyData = this.company.msg;
    });
  }

}

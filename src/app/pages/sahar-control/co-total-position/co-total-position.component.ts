import { Component } from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';

@Component({
  selector: 'app-co-total-position',
  templateUrl: './co-total-position.component.html',
  styleUrls: ['./co-total-position.component.scss']
})
export class CoTotalPositionComponent {
  company: any;
  companyData: any;
  name!: string;
  columnsToDisplay = [
    'row',
    'CoName',
    'AuditorName',
    'ActivityName',
    'DurationDateEnd',
    'ContractStatus',
    'ReportStatus',
    'FirmActivition',
    'Cancel',
    'ContractGcode',
    'ReportGcode',
    'OldGCode',
    'FinalAmount',
    'FinalTime',
    'Sign1',
    'Sign2',
  ];
  constructor(private callData: CallDataService) { }

  ngGetContract(name: string): void {
    const data: any = {
      NationalId: name,
    };
    this.callData.getReportData(data).subscribe( (res) => {
      this.company = res.msg;
    });
  }

}




import {Component, OnInit} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-iacpa-contract-controled',
  templateUrl: './iacpa-contract-controled.component.html',
  styleUrls: ['./iacpa-contract-controled.component.scss']
})
export class IacpaContractControledComponent implements OnInit {
  saharContract: any = [];
  saharContractPage: any;
  columnsToDisplay = [
    'Position',
    'AuditorName',
    'CustomerName',
    'CustomerNationalID',
    'DurationDateEnd',
    'amount',
    'AvgHAmount',
    'LastAmount',
    'LastAuditor',
    'LastYear',
    'StatusName',
    'ActivityName',
  ];
  active!: boolean;
  params: any;
  name!: string;
  pageNumber = 1;
  constructor(private callData: CallDataService,   private route: ActivatedRoute,
              private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetSaharContracts(true);
      } else {
        this.ngGetSaharContracts(false);
      }
    });
  }

  ngOnInit(): void {
  }

  ngGetSaharContracts(state: boolean): void {
    const data: any = {
      kind: 'F31141'
    };
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
      data.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getReportsControl(data).subscribe((saharContract) => {
      if (saharContract.msg) {
        this.saharContractPage = saharContract;
        this.saharContract = this.saharContractPage.msg;
      }
      this.active = true;
    });
  }

  ngSearch(name: string): void {
    this.router.navigate(['SaharControl/IacpaContractControled', 1, name]);
  }
}

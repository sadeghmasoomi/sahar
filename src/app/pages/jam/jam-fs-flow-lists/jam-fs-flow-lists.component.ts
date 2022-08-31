import { Component } from '@angular/core';
import {CallDataService} from '../../../services/jam/call-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-jam-fs-flow-lists',
  templateUrl: './jam-fs-flow-lists.component.html',
  styleUrls: ['./jam-fs-flow-lists.component.scss']
})
export class JamFsFlowListsComponent {
  columnsToDisplay = [
    'position',
    'CustomerName',
    'CustomerNationalId',
    'DurationDateEnd',
    'DurationYear',
    'TreatyDate',
    'TreatyNo',
    'operation'];
  firmContract: any;
  params: any;
  name!: string;
  pageNumber!: number;
  data: any;
  dataSource: any;
  constructor(private callApi: CallDataService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.GetFirmContract(true);
      } else {
        this.GetFirmContract(false);
      }
    });
  }

  GetFirmContract(stateValue: boolean): void {
    this.pageNumber =  1;
    if (stateValue) {
      this.pageNumber = Number(this.params.get('pageNumber'));
    }
    const data: any = {
      Kind: 'Audit101',
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      pageNumber: this.pageNumber,
      FV1: ''
    };
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callApi.getJam(data).subscribe((FirmContract => {
      this.data = FirmContract;
      this.firmContract = this.data.msg;
      this.dataSource = new MatTableDataSource<any>(this.firmContract);
    }));
  }

  ngSearch(name: string): void {
    this.router.navigate(['/Sahar/JamControl', 1, name]);
  }
}

import { Component } from '@angular/core';
import {CallDataService} from '../../services/govAudit/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-insure-view',
  templateUrl: './insure-view.component.html',
  styleUrls: ['./insure-view.component.scss']
})
export class InsureViewComponent {
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
      Kind: 'Insure103',
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

  ngSearch(name: string): void {
    this.router.navigate(['Insure/InsureView', 1, name]);
  }

}

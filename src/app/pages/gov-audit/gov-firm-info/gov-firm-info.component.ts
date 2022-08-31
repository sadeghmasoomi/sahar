import { Component } from '@angular/core';
import {CallDataService} from '../../../services/govAudit/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateGovFormInfoComponent} from './update-gov-form-info/update-gov-form-info.component';

@Component({
  selector: 'app-gov-firm-info',
  templateUrl: './gov-firm-info.component.html',
  styleUrls: ['./gov-firm-info.component.scss']
})
export class GovFirmInfoComponent {
  params: any;
  govFirmInfo: any;
  govFirmInfoData: any;
  pageNumber!: number;
  name!: string;
  columnsToDisplay = [
    'Position',
    'Name',
    'NationalID',
    'StateName1',
    'StatName2',
    'StatName3',
    'IsBourse',
    'operation',
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
      Kind: 'Gov103'
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
      this.govFirmInfo = res;
      this.govFirmInfoData = res.msg;
    });
  }

  editFirmInfo(value: any): void {
    const dialogRef = this.dialog.open(UpdateGovFormInfoComponent,
      {
        width: '650px',
        data: value
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetGovAudit(true);
    });
  }

  ngSearch(name: string): void {
    this.router.navigate(['GovAudit/GovFirmInfo', 1, name]);
  }

}

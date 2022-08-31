import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {CallDataService} from '../../../services/jam/call-data.service';

@Component({
  selector: 'app-jam-fs-flow-history',
  templateUrl: './jam-fs-flow-history.component.html',
  styleUrls: ['./jam-fs-flow-history.component.scss']
})
export class JamFsFlowHistoryComponent {

  JamFsFlowControled: any;
  JamFsFlowControledData: any;
  params: any;
  name!: string;
  pageNumber!: number;
  columnsToDisplay = [
    'RowN',
    'UserName',
    'CoName',
    'ActionDate',
    'ActionTime',
    'ActionSide',
    'ActionName',
  ];
  constructor(private callData: CallDataService,
              private dialog: MatDialog, private snackBar: MatSnackBar,
              private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetJamFsFlowHistory(true);
      } else {
        this.ngGetJamFsFlowHistory(false);
      }
    });
  }

  ngGetJamFsFlowHistory(state: boolean): void {
    this.pageNumber =  1;
    const data: any = {
      Kind : 'R11142M',
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
    this.callData.getJam(data).subscribe( (res) => {
      this.JamFsFlowControled = res;
      this.JamFsFlowControledData = res.msg;
    });
  }

  ngGetData(item: any): void {
    if (!item.data) {
      const data = {
        Kind : 'R11142D',
        MasterCode: item.GCode,
        LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
      };
      this.callData.getJam(data).subscribe( res => {
        item.data = res.msg;
      });
    }
  }

  ngSearch(name: string): void {
    this.router.navigate(['Jam/JamFsFlowHistory', 1, name]);
  }
}

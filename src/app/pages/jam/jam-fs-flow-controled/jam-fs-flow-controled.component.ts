import { Component } from '@angular/core';
import {CallDataService} from '../../../services/jam/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-jam-fs-flow-controled',
  templateUrl: './jam-fs-flow-controled.component.html',
  styleUrls: ['./jam-fs-flow-controled.component.scss']
})
export class JamFsFlowControledComponent {
  jamFsFlowHistory: any;
  columnsToDisplay = [
    'position',
    'CustomerName',
    'CustomerNationalId',
    'DurationDateEnd',
    'DurationYear',
    'TreatyDate',
    'TreatyNo',
    'operation'];
  params: any;
  name!: string;
  pageNumber!: number;
  data: any;
  dataSource: any;
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
      Kind : 'R11143M',
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
      this.jamFsFlowHistory = res;
      this.dataSource = new MatTableDataSource<any>(this.jamFsFlowHistory.msg);
    });
  }

  // ngGetData(item): void {
  //   if (!item.data) {
  //     const data = {
  //       Kind: 'R11143D',
  //       MasterCode: item.GCode,
  //       LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
  //     };
  //     this.callData.getJam(data).subscribe( res => {
  //       item.data = res.msg;
  //     });
  //   }
  // }

  ngSearch(name: string): void {
    this.router.navigate(['Jam/JamFsFlowControled', 1, name]);
  }
}

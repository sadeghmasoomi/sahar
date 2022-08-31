import {Component, Inject, OnInit} from '@angular/core';
import {CallDataService} from '../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SelectionModel} from '@angular/cdk/collections';
import {first} from 'rxjs/operators';
import {UnAcceptContractComponent} from '../modal/unaccept-contract/unaccept-contract.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-jam-fs-flow-control',
  templateUrl: './jam-fs-flow-control.component.html',
  styleUrls: ['./jam-fs-flow-control.component.scss']
})
export class JamFsFlowControlComponent {
  firmContract: any;
  selection: any;
  dataSource: any;
  param: any;
  activeButton!: boolean;
  constructor(private callApi: CallDataService, route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    route.params.subscribe(param => {
      this.param = param;
      this.activeButton = (this.param.active  === 'true');
      this.GetFirmContract();
    });
  }

  GetFirmContract(): void  {
    const data = {
      Kind: 'Audit101S',
      MasterCode: this.param.idNumber,
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };

    this.callApi.getJam(data).subscribe((FirmContract => {
      this.firmContract = FirmContract.msg;
      this.dataSource = new MatTableDataSource<any>(this.firmContract);
      this.selection = new SelectionModel<any>(true, []);
    }));
  }

  ngAccept(Gcode: string): void  {
    const data = {
      action: '4',
      UnitContractGcode: Gcode,
      FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
    };

    if (confirm('برای تایید صورت مالی اطمینان دارید ؟')) {
      this.callApi.confirmContract(data)
        .pipe(first())
        .subscribe(flow => {
          if (flow.state) {
            this.snackBar.open(flow.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
            this.GetFirmContract();
          } else {
            this.snackBar.open(flow.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-error'
            });
          }
        });
    }

  }

  ngUnAccept(Gcode: string): void  {
    const dialogRef = this.dialog.open(UnAcceptContractComponent,
      {
        width: '650px',
        data: {GCode: Gcode}
      });
    dialogRef.afterClosed().subscribe(() => {
      this.GetFirmContract();
    });
  }
}

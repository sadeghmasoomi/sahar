import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CallDataService } from 'src/app/services/sahar/call-data.service';
import {DetailsContractComponent} from './details-contract/details-contract.component';

@Component({
  selector: 'app-audit-contract-process-manager-accept',
  templateUrl: './audit-contract-process-manager-accept.component.html',
  styleUrls: ['./audit-contract-process-manager-accept.component.scss']
})
export class AuditContractProcessManagerAcceptComponent implements OnInit {
  columnsToDisplayEd = [
    'Name',
    'NationalID',
    'DurationDateEnd',
    'BudjetHorse',
    'GnrActivityName',
    'amount',
    'StatusName',
    'operation',
  ];
  companySin: any;
  constructor(private callData: CallDataService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ngGetSinContract();
  }

  ngGetSinContract(): void {
    const data = {
      FirmInfoAuditGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };

    this.callData.getSignContract(data).subscribe((company) => {
      this.companySin = company.msg;
    });
  }

  ngChangeStatus(SignIndex: number, GCode: string, FirmContractGCode: any): void {
    let StatusGcode = 0;
    if (confirm ('قرارداد را امضاء میکنید ؟')) {
      if (SignIndex === 1) {
        StatusGcode = 11;
      } else {
        StatusGcode = 12;
      }
      const data = {
        GCode,
        action: '4',
        FirmContractGCode,
        StatusGcode
      };
      this.callData.changeStatus(data)
        .pipe(first())
        .subscribe(updateContract => {
          if (updateContract.state) {
            this.snackBar.open(updateContract.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
            this.ngGetSinContract();
          } else {
            this.snackBar.open(updateContract.msg, 'x', {
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

  ngUnChangeStatus(SignIndex: number, GCode: string, FirmContractGCode: any): void {
    let StatusGcode = 0;
    if (confirm('از عدم تایید مطمئن هستید ؟')) {
      if (SignIndex === 1) {
        StatusGcode = 21;
      } else {
        StatusGcode = 22;
      }
      const data = {
        GCode,
        action: '4',
        StatusGcode,
        FirmContractGCode,
      };
      this.callData.changeStatus(data)
        .pipe(first())
        .subscribe(updateContract => {
          if (updateContract.state) {
            this.snackBar.open(updateContract.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
            this.ngGetSinContract();
          } else {
            this.snackBar.open(updateContract.msg, 'x', {
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

  openDetails(item: any): void {
  this.dialog.open(DetailsContractComponent, {
    width: '600px',
    data: item
  });
  }

}

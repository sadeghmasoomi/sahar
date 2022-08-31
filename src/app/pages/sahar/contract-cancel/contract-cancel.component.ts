import {Component, ViewChild} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {first} from 'rxjs/operators';
import {DetailsContractComponent} from '../audit-contract-process-manager-accept/details-contract/details-contract.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-contract-cancel',
  templateUrl: './contract-cancel.component.html',
  styleUrls: ['./contract-cancel.component.scss']
})
export class ContractCancelComponent {
  companySin!: MatTableDataSource<any>;
  columnsToDisplayEd = [
    'Name',
    'NationalID',
    'DurationDateEnd',
    'TreatyDate',
    'TreatyNo',
    'Amount',
    'StatusName',
    'operation',
  ];
  name!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataService,  private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.ngGetSinContract();
  }

  ngGetSinContract(): void {
    const data = {
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };

    this.callData.getContractsForCancel(data).subscribe((company) => {
      this.companySin = new MatTableDataSource<any>(company.msg);
      this.companySin.paginator = this.paginator;
    });
  }

  ngChangeStatus(GCode: string): void {
    if (confirm('مایل به فسخ قرارداد هستید ؟')) {
      const data = {
        GCode,
      };
      this.callData.cancelContracts(data)
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

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.companySin.filter = name;
  }
}

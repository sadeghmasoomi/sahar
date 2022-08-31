import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CallDataService} from '../../../../services/sahar/call-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ConvertNationalIdSetComponent} from "./convert-national-id-set/convert-national-id-set.component";

@Component({
  selector: 'app-convert-national-id-add',
  templateUrl: './convert-national-id-add.component.html',
  styleUrls: ['./convert-national-id-add.component.scss']
})
export class ConvertNationalIdAddComponent {
  name!: string;
  customers!: MatTableDataSource<any>;
  columnsToDisplay = [
    'row',
    'Name',
    'NationalID',
    'TradeNo',
    'TradeCityName',
    'WorkAddress',
    'op',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ConvertNationalIdAddComponent>) { }

  onNoClick(data: boolean): void {
    this.dialogRef.close(data);
  }

  addContractInfoOld(data: any): void {
    const dialog = this.dialog.open(ConvertNationalIdSetComponent, {
      data
    });
    dialog.afterClosed().subscribe((res) => {
        if (res) {
          this.onNoClick(true);
        }
    });
  }

  ngSearch(text: string): void {
    const data = {
      Kind: 'Co101S',
      locationGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      FV1: text,
    };
    this.callData.getCustomerInfoOld(data).subscribe(res => {
      this.customers = new MatTableDataSource<any>(res.msg);
      this.customers.paginator = this.paginator;
    });
  }
}

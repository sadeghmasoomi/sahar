import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {ConvertNationalIdAddComponent} from './convert-national-id-add/convert-national-id-add.component';

@Component({
  selector: 'app-convert-national-id',
  templateUrl: './convert-national-id.component.html',
  styleUrls: ['./convert-national-id.component.scss']
})
export class ConvertNationalIdComponent {
  name!: string;
  customers!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnsToDisplay = [
    'row',
    'OldName',
    'OldNationalId',
    'FirmName',
    'TradeCityName',
    'TradeNo',
    'Organization',
    'Comment',
    'Address',
    'operation',
  ];
  constructor(private callData: CallDataService, private dialog: MatDialog) {
    this.ngGetContractInfoOlds();
  }

  ngGetContractInfoOlds(): void{
    const data = {
      Kind: 'Co101',
      locationGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.getCustomerInfoOld(data).subscribe((res) => {
      this.customers = new MatTableDataSource<any>(res.msg);
    });
  }

  ngSearch(name: any): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.customers.filter = name;
  }

  addContractInfoOld(): void {
    const dialog = this.dialog.open(ConvertNationalIdAddComponent, {
      width: '80%',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.ngGetContractInfoOlds();
      }
    });
  }
}

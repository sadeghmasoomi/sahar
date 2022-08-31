import {Component, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {ScrollToBottomDirective} from '../../../layout/directive/scroll-to-bottom.directive';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-audit-contract-process',
  templateUrl: './audit-contract-process.component.html',
  styleUrls: ['./audit-contract-process.component.scss']
})
export class AuditContractProcessComponent {
  columnsToDisplay = [
    'row',
    'Name',
    'NationalID',
    'DurationDate',
    'BudjetHorse',
    'GnrActivityKindName',
    'amount',
    'StatusName',
    'operation',
  ];
  company: any;
  companyData!: MatTableDataSource<any>;
  params: any;
  name!: string;
  pageNumber!: number;
  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;
  index = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.ngGetContract();
  }

  ngGetContract(): void {
    const data: any = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getContract(data).subscribe( (res) => {
      this.company = res.msg;
      this.companyData = new MatTableDataSource<any>(this.company.filter((
        values: any) => values.statusGcode > 0 && values.statusGcode < 23
      ));
      this.companyData.paginator = this.paginator;
    });
  }

  ngChangeStatus(GCode: string | number): void {
    if (confirm('قرارداد تایید شود')) {
      const data = {
        StatusGCode: '10',
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        action: '1',
        FirmContractGcode: GCode,
      };
      this.callData.saharControlAccept(data)
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
            this.ngGetContract();
            this.router.navigate(['Sahar/AuditContractProcess']);
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

  openComment(comment: string): void {
    this.snackBar.open(comment, 'بستن', {
      duration: 100000,
      direction: 'rtl',
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  deleteContract(GCode: string): void {
    const data = {
      action: 3,
      GCode
    };
    this.callData.operationContract(data).subscribe((res) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.ngGetContract();
      } else {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
      }
    });
  }

  filterCompany(index: number): void {
    this.index = index;
    if (index === 1) {
      this.companyData  = new MatTableDataSource<any>(this.company.filter((
        values: any) => values.statusGcode > 0 && values.statusGcode < 23
      ));
      this.companyData.paginator = this.paginator;
    } else if (index === 2) {
      this.companyData  = new MatTableDataSource(this.company.filter((values: any) => values.statusGcode === 41));
      this.companyData.paginator = this.paginator;
    } else if (index === 3) {
      this.companyData  = new MatTableDataSource(this.company.filter((values: any) => values.statusGcode === 40));
      this.companyData.paginator = this.paginator;
    }
  }

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.company) {
      const list: any = {};
      if (item.Name) {
        list['نام شرکت'] = item.Name;
      }
      if (item.NationalID) {
        list['شناسه ملی'] = item.NationalID;
      }
      if (item.BudjetHorse) {
        list['ساعت بودجه'] = item.BudjetHorse;
      }

      if (item.GnrActivityKindName) {
        list['نوع قرارداد'] = item.GnrActivityKindName;
      }

      if (item.TreatyNo) {
        list['شماره قرارداد'] = item.TreatyNo;
      }

      if (item.TreatyDate) {
        list['تاریخ قرارداد'] = item.TreatyDate;
      }

      if (item.DurationDateYear) {
        list['سال مالی'] = item.DurationDateYear;
      }
      if (item.amount) {
        list['مبلغ قرارداد'] = item.amount;
      }
      if (item.SignDate) {
        list['تاریخ امضا قراداد'] = item.SignDate;
      }
      if (item.StatusName) {
        list['وضعیت '] = item.StatusName;
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of Contracts');
  }

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.companyData.filter = name;
  }
}

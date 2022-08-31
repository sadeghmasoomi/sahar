import { Component, ViewChild } from '@angular/core';
import { CallDataService } from 'src/app/services/sahar/call-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sahar-reports',
  templateUrl: './sahar-reports.component.html',
  styleUrls: ['./sahar-reports.component.scss'],
})
export class SaharReportsComponent {
  name!: string;
  reportContract: any;
  reportContractData!: MatTableDataSource<any>;
  active = false;
  columnsToDisplay = [
    'row',
    'Name',
    'NationalId',
    'DurationDateStart',
    'DurationDateEnd',
    'TreatyNo',
    'TreatyDate',
    'ActivityName',
    'SignDate',
    'SendDate',
    'StatusName',
    'operation',
  ];
  index = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  params: any;
  pageNumber!: number;
  constructor(private callData: CallDataService) {
    this.ngReportContract();
  }

  ngReportContract(): void {
    const data = {
      pageNumber: 1,
      FirmInfoAuditGCode: JSON.parse(sessionStorage.getItem('menu') as string)
        .FirminfoGcode,
    };
    this.callData.getReportsContracts(data).subscribe((report) => {
      if (report.msg) {
        this.reportContract = report.msg;
        this.reportContractData = new MatTableDataSource<any>(
          this.reportContract.filter(
            (values: any) => values.StatusGcode > 0 && values.StatusGcode < 23
          )
        );
        this.reportContractData.paginator = this.paginator;
      }
      this.active = true;
    });
  }

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.reportContractData.filter = name;
  }

  filterCompany(index: number): void {
    this.index = index;
    if (index === 1) {
      this.reportContractData = new MatTableDataSource<any>(
        this.reportContract.filter(
          (values: any) => values.StatusGcode > 0 && values.StatusGcode < 23
        )
      );
      this.reportContractData.paginator = this.paginator;
    } else if (index === 2) {
      this.reportContractData = new MatTableDataSource(
        this.reportContract.filter((values: any) => values.StatusGcode === 41)
      );
      this.reportContractData.paginator = this.paginator;
    } else if (index === 3) {
      this.reportContractData = new MatTableDataSource(
        this.reportContract.filter(
          (values: any) =>
            values.StatusGcode === 40 || values.StatusGcode === 42
        )
      );
      this.reportContractData.paginator = this.paginator;
    } else if (index === 4) {
      this.reportContractData = new MatTableDataSource(
        this.reportContract.filter((values: any) => values.StatusGcode === 0)
      );
      this.reportContractData.paginator = this.paginator;
    }
  }

  exportExcel(): void {
    console.log(this.reportContract);
    const data: any[] = [];
    for (const item of this.reportContract) {
      const list: any = {};
      if (item.Name) {
        list['نام شرکت'] = item.Name;
      }
      if (item.NationalId) {
        list['شناسه ملی'] = item.NationalId;
      }
      if (item.DurationDateStart) {
        list['شروع سال مالی'] = item.DurationDateStart;
      }
      if (item.DurationDateEnd) {
        list['پایان سال مالی'] = item.DurationDateEnd;
      }
      if (item.TreatyDate) {
        list['تاریخ قرارداد'] = item.TreatyDate;
      }
      if (item.TreatyNo) {
        list['شماره قرارداد'] = item.TreatyNo;
      }
      if (item.ActivityName) {
        list['نوع قرارداد'] = item.ActivityName;
      }
      if (item.SignDate) {
        list['تاریخ تایید مدیر '] = item.SignDate;
      }
      if (item.SendDate) {
        list['تاریخ ارسال به جامعه'] = item.SendDate;
      }
      if (item.StatusName) {
        list['وضعیت '] = item.StatusName;
      }

      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of reports');
  }
}

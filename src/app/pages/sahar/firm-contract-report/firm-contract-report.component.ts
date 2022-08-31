import { Component, OnInit, ViewChild } from '@angular/core';
import { CallDataService } from '../../../services/sahar/call-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-firm-contract-report',
  templateUrl: './firm-contract-report.component.html',
  styleUrls: ['./firm-contract-report.component.scss'],
})
export class FirmContractReportComponent implements OnInit {
  reportData: any;
  reportDataRequests: any;
  dates: any = {};
  name!: any;
  columnsToDisplay = [
    'row', // ردیف
    'Name', // نام شرکت
    'NationalID', // شناسه ملی
    'TreatyNo', // شماره قرارداد
    'TreatyDate', // تاریخ قرارداد
    'SignDate', // تاریخ امضا قرار داد
    'SendDate', // تاریخ ارسال قرارداد به جامعه
    'DurationDateEnd', // سال مالی
    'DurationDateYear', // سال
    'BudjetHorse', // ساعت بودجه
    'FinalTime', // ساعت واقعی
    'Amount', // مبلغ قرارداد
    'FinalAmount', // مبلغ نهایی
    'ContratCancel', // ابطال
    'ActivityName', // نوع گزارش
    'IsReport', // دارای گزارش
    'OpinionName', // نوع اظهار نظر
    'RsendDate', // تاریخ ارسال گزارش
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private callData: CallDataService) {}

  ngOnInit(): void {
    this.ngReportContract();
  }

  ngReportContract(): void {
    const data = {
      Kind: 'R21205',
      LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string)
        .FirminfoGcode,
    };
    this.callData.FirmContractReport(data).subscribe((res) => {
      this.reportDataRequests = res;
      this.reportData = new MatTableDataSource<any>(
        this.reportDataRequests.msg.sort()
      );
      this.reportData.sort = this.sort;
      this.reportData.paginator = this.paginator;
    });
  }

  // فیلتر تاریخ
  filterDate(date: any): void {
    this.reportData = new MatTableDataSource<any>(
      this.reportDataRequests.msg.filter(
        (values: any) =>
          Number(values.DurationDateYear) >= Number(date.one) &&
          Number(values.DurationDateYear) <= Number(date.twe)
      )
    );
    this.reportData.paginator = this.paginator;
    this.reportData.sort = this.sort;
  }

  // فیلتر جدول
  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reportData.filter = filterValue.trim().toLowerCase();
  }
  // دانلود اکسل سورت شده
  exportExcelSort(): void {
    this.callData.exportExcel('InstitutionsExcel');
  }
  // دانلود اکسل کلی
  exportExcel(): void {
    const items: any[] = [];
    for (const item of this.reportDataRequests.msg) {
      const list = {
        'نام شرکت': item.Name,
        'شناسه ملی': item.NationalID,
        'شماره قرارداد': item.TreatyNo,
        'تاریخ قرارداد': item.TreatyDate,
        'تاریخ امضا قرار داد': item.SignDate,
        'تاریخ ارسال قرارداد به جامعه': item.SendDate,
        'سال مالی': item.DurationDateEnd,
        ' سال': item.DurationDateYear,
        'ساعت بودجه': item.BudjetHorse,
        'ساعت واقعی': item.FinalTime,
        'مبلغ قرارداد': item.Amount,
        'مبلغ نهایی': item.FinalAmount,
        ' ابطال': item.ContratCancel,
        'نوع گزارش': item.ActivityName,
        'دارای گزارش': item.IsReport,
        'نوع اظهار نظر': item.OpinionName,
        'تاریخ ارسال گزارش': item.RsendDate,
      };
      items.push(list);
    }
    this.callData.exportAsExcelFile(items, 'InstitutionsExcel');
  }
}

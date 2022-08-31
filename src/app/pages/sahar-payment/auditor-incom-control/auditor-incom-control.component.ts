import { Component, ElementRef, ViewChild } from '@angular/core';
import { CallDataService } from '../../../services/sahar/call-data.service';
import { PdfAuditorContractReportComponent } from '../../sahar/auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-auditor-incom-control',
  templateUrl: './auditor-incom-control.component.html',
  styleUrls: ['./auditor-incom-control.component.scss'],
})
export class AuditorIncomControlComponent {
  income: any;
  incomeData!: MatTableDataSource<any>;
  data!: Observable<any>;
  excelDat: any = {};
  columnsToDisplay = ['row', 'Name', 'Amount'];
  params: any;
  name!: string;
  index = 1;
  dates: any = {};
  filterData: any;

  @ViewChild('link') link!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private callData: CallDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.ngFirmIncomeData();
  }

  ngOnDestroy(): void {
    if (this.data) {
      this.incomeData.disconnect();
    }
  }

  base64ToArrayBuffer(base64: string): any {
    let binarystring = base64.replace(/\\n/g, '');
    binarystring = window.atob(base64);
    const len = binarystring.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binarystring.charCodeAt(i);
    }
    return bytes.buffer;
  }

  ngFirmIncomeData(): void {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string)
        .FirminfoGcode,
    };
    this.callData.adminFirmIncomeData(data).subscribe((res) => {
      this.income = res.msg;
      this.incomeData = new MatTableDataSource<any>(
        this.income.filter(
          (values: any) => values.StatusGCode > 0 && values.StatusGCode === 20
        )
      );
      // values.StatusGCode > 0 && values.StatusGCode === 20
      this.incomeData.paginator = this.paginator;
      this.data = this.incomeData.connect();
    });
  }

  ngGetData(item: any): void {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string)
        .FirminfoGcode,
      MasterCode: item.GCode,
    };
    this.callData.firmIncomeData(data).subscribe((res) => {
      item.data = res.msg;
    });
  }

  ngGetPdf(item: any): void {
    if (item.pdf) {
      this.ngOpenModal(item.pdf, item);
    } else {
      const data = {
        FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string)
          .FirminfoGcode,
        MasterCode: item.GCode,
      };
      this.callData.FirmIncomeFile(data, 'ezharnameh').subscribe((res) => {
        item.pdf = res;
        this.ngOpenModal(res, item);
      });
    }
  }

  ngOpenModal(pdf: any, item: any): void {
    const pdfConvertor = this.base64ToArrayBuffer(pdf);
    this.dialog.open(PdfAuditorContractReportComponent, {
      data: { data: item, pdf: pdfConvertor },
      height: '90vh0',
      width: '800px',
    });
  }

  firmIncomeFile(item: any): void {
    this.excelDat = {};
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string)
        .FirminfoGcode,
      MasterCode: item.GCode,
    };
    this.callData.FirmIncomeFile(data, 'report').subscribe((res) => {
      if (!res) {
        this.snackBar.open('فایل موجود نیست', 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error',
        });
        return;
      }
      this.excelDat = {
        extension: res.extension,
        file: res.file,
      };
      if (this.excelDat.file && this.excelDat.extension) {
        setTimeout(() => {
          const el = this.link.nativeElement as HTMLElement;
          el.click();
        }, 1000);
      }
    });
  }

  onSubmit(GCode: string, status: number): void {
    if (confirm('آیا مطمئن هستید ؟')) {
      const data = {
        GCode,
        StatusGCode: status,
        Action: 2,
        FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string)
          .FirminfoGcode,
        LocationGcode: JSON.parse(sessionStorage.getItem('menu') as string)
          .FirminfoGcode,
      };
      const fileToUpload = new FormData();
      fileToUpload.append('formData', JSON.stringify(data));
      this.callData
        .updateFirmIncomeHeader(fileToUpload)
        .subscribe((res: any) => {
          if (res.state) {
            this.snackBar.open(res.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success',
            });
            this.ngFirmIncomeData();
          } else {
            this.snackBar.open(res.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-error',
            });
          }
        });
    }
  }

  filterCompany(index: number): void {
    this.index = index;
    if (index === 1) {
      this.incomeData = new MatTableDataSource<any>(
        this.income.filter(
          (values: any) => values.StatusGCode > 0 && values.StatusGCode === 20
        )
      );
      this.incomeData.paginator = this.paginator;
      this.data = this.incomeData.connect();
    } else if (index === 2) {
      this.incomeData = new MatTableDataSource(
        this.income.filter((values: any) => values.StatusGCode === 40)
      );
      this.incomeData.paginator = this.paginator;
      this.data = this.incomeData.connect();
    } else if (index === 3) {
      this.incomeData = new MatTableDataSource(
        this.income.filter((values: any) => values.StatusGCode === 41)
      );
      this.incomeData.paginator = this.paginator;
      this.data = this.incomeData.connect();
    }
  }

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.incomeData.filteredData) {
      const list: any = {};
      if (item.FirmCode) {
        list['کد موسسه'] = item.FirmCode;
      }
      if (item.AuditorName) {
        list['نام موسسه'] = item.AuditorName;
      }
      if (item.SessionName) {
        list['فصل '] = item.SessionName;
      }
      if (item.TotalAmount) {
        list['مبلغ کل فصل'] = item.TotalAmount;
      }
      if (item.StatusName) {
        list['وضعیت '] = item.StatusName;
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of report');
  }

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.incomeData.filter = name;
    console.log('name===>', name);
  }

  // =====================================================
  // فیلتر جدول
  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.incomeData.filter = filterValue.trim().toLowerCase();
    this.filterData = filterValue;
  }

  sortData(sort: Sort): void {
    const data = this.incomeData.data.slice();

    if (!sort.active || sort.direction === '') {
      this.incomeData = new MatTableDataSource<any>(data);
      return;
    }

    this.incomeData = new MatTableDataSource<any>(
      data.sort((a: any, b: any) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'FirmCode':
            return compare(a.FirmCode, b.FirmCode, isAsc);
          case 'AuditorName':
            return compare(a.AuditorName, b.AuditorName, isAsc);
          case 'SessionName':
            return compare(a.SessionName, b.SessionName, isAsc);
          case 'TotalAmount':
            return compare(a.TotalAmount, b.TotalAmount, isAsc);
          case 'StatusName':
            return compare(a.StatusName, b.StatusName, isAsc);
          case 'EZActionDate':
            return compare(a.EZActionDate, b.EZActionDate, isAsc);
          default:
            return 0;
        }
      })
    );
    this.incomeData.paginator = this.paginator;
    this.data = this.incomeData.connect();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): any {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-firm-report1',
  templateUrl: './firm-report1.component.html',
  styleUrls: ['./firm-report1.component.scss']
})
export class FirmReport1Component implements OnInit, OnDestroy {
  firms!: MatTableDataSource<any>;
  firmsConnect: any;
  firmsValues: any;
  name!: string;
  displayedColumnsMembers = [
    'Position',
    'Code',
    'FName',
    'LName',
    'NationalCode',
    'StartDate',
    'Age',
    'RankName',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private callData: CallDataMembersService) { }

  ngOnInit(): void {
    this.getFirms();
  }

  getFirms(): void {
    const data: any = {
      Kind: 'R22501M',
      FV1: '',
    };
    this.callData.getFirms(data).subscribe((firms) => {
      if (firms.state) {
        this.firmsValues = firms.msg;
        this.firms = new MatTableDataSource<any>(this.firmsValues);
        this.firms.paginator = this.paginator;
        this.firms.sort = this.sort;
        this.firmsConnect = this.firms.connect();
      }
    });
  }

  getFirmsData(item: any): void{
    if (!item.data) {
      const data: any = {
        Kind: 'R22501D',
        MasterCode: item.GCode
      };
      this.callData.getFirms(data).subscribe((firms) => {
        if (firms.state) {
          item.data = firms.msg;
        }
      });
    }
  }

  ngSearch(name: string): void {
    name = name.trim(); // Remove whitespace
    name = name.toLowerCase(); // Datasource defaults to lowercase matches
    this.firms.filter = name;
  }

  exportExcel(): void {
    const data: any[] = [];
    for (const item of this.firmsValues) {
      const list: any = {};
      if (item.Code) {
        list['کد '] = item.Code;
      }
      if (item.Name) {
        list['نام موسسه'] = item.Name;
      }
      if (item.NationalID) {
        list['شناسه ملی'] = item.NationalID;
      }
      if (item.Partner) {
        list['تعداد شریک'] = item.Partner;
      }
      if (item.Manager) {
        list['تعداد مدیر'] = item.Manager;
      }
      if (item.AvrageMemAge) {
        list['میانگین سن'] = item.AvrageMemAge;
      }
      if (item.FirmKindName) {
        list['نوع موسسه'] = item.FirmKindName;
      }
      if (item.FirmStatusName) {
        list['وضعیت موسسه'] = item.FirmStatusName;
      }
      data.push(list);
    }
    this.callData.exportAsExcelFile(data, 'Excel of report');
  }

  ngOnDestroy(): void {
    if (this.firms) {
      this.firms.disconnect();
    }
  }
}

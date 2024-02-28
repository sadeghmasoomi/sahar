import { Component, OnInit, ViewChild } from '@angular/core';
import { CallDataService } from 'src/app/services/sahar/call-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-create-ntsw',
  templateUrl: './user-create-ntsw.component.html',
  styleUrls: ['./user-create-ntsw.component.scss'],
})
export class UserCreateNtswComponent implements OnInit {
  name!: string;
  usersNtsw: any;
  columnsToDisplay = [
    'row',
    'Name',
    'FirmCode',
    'FirmName',
    // 'GenderName',
    // 'SystemName',
    // 'RoleName',
    // 'StartJdate',
    // 'EndJdate',
    // 'ActiveName',
  ];

  constructor(private callData: CallDataService, private router: Router) {}
  ngOnInit(): void {
    this.ngGetContract();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngGetContract(): void {
    const data = {
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string)
        .FirminfoGcode,
    };
    this.callData.getUserCreateNtsw(data).subscribe((res) => {
      this.usersNtsw = res.msg;
      this.usersNtsw = new MatTableDataSource<any>(this.usersNtsw);
      this.usersNtsw.paginator = this.paginator;
    });
  }

  ngSearch(name: string): void {
    console.log(name);
    name = name.trim();
    name = name.toLowerCase();
    this.usersNtsw.filter = name;
  }
}

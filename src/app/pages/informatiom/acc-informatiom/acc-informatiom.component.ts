import {Component, OnInit, ViewChild} from '@angular/core';
import {InformatiomService} from '../../../services/Informatiom/informatiom.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddInformatiomComponent} from '../modal/add-informatiom/add-informatiom.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-acc-informatiom',
  templateUrl: './acc-informatiom.component.html',
  styleUrls: ['./acc-informatiom.component.scss']
})
export class AccInformatiomComponent implements OnInit {
  getInfo: any;
  getAddInfo: any;
  getAddInfoComplete: any;
  getInfoToDisplay = [
    'CoName',
    'NationalID',
    'DurationDateYear',
    'DurationDateEnd',
    'ActivityName',
    'operation',
  ];
  getAddInfoDisplay = [
    'CoName',
    'NationalID',
    'DurationDateYear',
    'DurationDateEnd',
    'ActivityName',
    'Operatingincome',
    'Totalassets',
    'RecivedIncome',
    'operation',
  ];
  index = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private informatiom: InformatiomService, public dialog: MatDialog, private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.fnRUN();
  }

  fnRUN(): void {
    this.ngGetInfo('I43101');
    this.ngGetInfo('G43101');
  }

  ngGetInfo(Kind: string): void {
    const data = {
      LocationGcode:  JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      Kind
    };
    this.informatiom.apiMakerPost(data, 'getInfo').subscribe(async res => {
      if (await res.state) {
       switch (Kind) {
         case 'I43101': {
           this.getInfo = new MatTableDataSource<any>(res.msg);
           this.getInfo.paginator = this.paginator;
           this.getInfo.sort = this.sort;
           break;
         }
         case 'G43101': {
           this.getAddInfoComplete = res.msg;
           this.getAddInfo = new MatTableDataSource<any>(this.getAddInfoComplete.filter((
             values: any) => !values.Active
           ));
           this.getAddInfo.paginator = this.paginator;
           this.getAddInfo.sort = this.sort;
           break;
         }
       }
      }
    });
  }

  ngAddInformatiom(item: any): void {
    const dialogRef = this.dialog.open(AddInformatiomComponent,
      {
        width: '650px',
        data: item
      });
    dialogRef.afterClosed().subscribe(async result => {
     if (await result) {
       this.fnRUN();
     }
    });
  }

  filterInfo(index: number): void {
    this.index = index;
    if (index === 1) {
      this.getAddInfo = new MatTableDataSource<any>(this.getAddInfoComplete.filter((
        values: any) => !values.Active
      ));
      this.getAddInfo.paginator = this.paginator;
    } else if (index === 2) {
      this.getAddInfo  = new MatTableDataSource(this.getAddInfoComplete.filter((values: any) => values.Active));
      this.getAddInfo.paginator = this.paginator;
    }
  }

  ngActiveInfo(element: any): void {
    const data = {
      GCode: element.GCode,
      FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      Operatingincome: element.Operatingincome,
      Totalassets: element.Totalassets,
      Action: 21,
      Active: 1
    };
    this.informatiom.apiMakerPost(data, 'getInfoUpdate').subscribe( res => {
      if (!res.state) {
        return;
      }
      this.snackBar.open(res.msg, 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-success'
      });
      this.fnRUN();
    });
  }
}

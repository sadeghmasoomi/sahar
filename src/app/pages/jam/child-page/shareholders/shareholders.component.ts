import { Component, OnInit } from '@angular/core';
import {Shareholders} from '../../../../model/shareholders/shareholders';
import {CallDataService} from '../../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-shareholders',
  templateUrl: './shareholders.component.html',
  styleUrls: ['./shareholders.component.scss']
})
export class ShareholdersComponent implements OnInit {
  displayedColumns: string[] = [
    'GnrFirmTypeGCode',
    'NationalId',
    'Name',
    'ShareQty',
    'SharePercent',
  ];
  params: any;
  /*Shareholders*/
  shareholders: any;
  constructor(private callData: CallDataService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void  {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngGetShareholders();
    });
  }

  ngGetShareholders(): void {
    const data = {
      Kind: 'Jam106',
      MasterCode: this.params.get('id')
    };
    this.callData.getJam(data).subscribe((shareholders => {
      this.shareholders = shareholders.msg;
    }));
  }

}

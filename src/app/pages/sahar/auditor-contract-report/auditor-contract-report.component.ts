import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {
  PdfAuditorContractReportComponent
} from './pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import {CallDataService} from '../../../services/sahar/call-data.service';

@Component({
  selector: 'app-auditor-contract-report',
  templateUrl: './auditor-contract-report.component.html',
  styleUrls: ['./auditor-contract-report.component.scss']
})
export class AuditorContractReportComponent {
  firmContractReport: any;
  firmContractReportData: any;
  params: any;
  name!: string;
  pageNumber!: number;
  constructor(private callData: CallDataService,
              private dialog: MatDialog, private snackBar: MatSnackBar,
              private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetFirmContractReport(true);
      } else {
        this.ngGetFirmContractReport(false);
      }
    });
  }

  base64ToArrayBuffer(base64: string): any {
    let binarystring = base64.replace(/\\n/g, '');
    binarystring =  window.atob(base64);
    const len = binarystring.length;
    const bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
      bytes[i] = binarystring.charCodeAt(i);
    }
    return bytes.buffer;
  }

  ngGetFirmContractReport(state: boolean): void {
    this.pageNumber =  1;
    const data: any = {};
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
      data.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.firmContractReport(data).subscribe( (res) => {
      this.firmContractReport = res;
      this.firmContractReportData = res.msg;
    });
  }

  ngGetPdf(item: any): void {
    if (item.pdf) {
      this.ngOpenModal(item);
    } else {
      const data = {
        MasterCode: item.data.GCode,
      };
      this.callData.firmContractReportPDF(data).subscribe( res => {
        item.pdf = this.base64ToArrayBuffer(res);
        this.ngOpenModal(item);
      });
    }
  }

  ngOpenModal(item: any): void {
    this.dialog.open(PdfAuditorContractReportComponent, {
      height: '90vh',
      width: '800px',
      data: {data: item, pdf: item.pdf },
    });
}

  ngSearch(name: string): void {
    this.router.navigate(['Sahar/AuditorContractReport', 1, name]);
  }

  ngReportContract(item: any): void {
    if (!item.data) {
      const data = {
        MasterCode: item.GCode,
      };
      this.callData.firmContractDetails(data).subscribe((report) => {
        item.data = report.msg[0];
      });
    } else {
      item.data = null;
    }
  }
}

import {Component, Inject} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {PdfAuditorContractReportComponent} from '../../sahar/auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';

@Component({
  selector: 'app-iacpa-report-controled',
  templateUrl: './iacpa-report-controled.component.html',
  styleUrls: ['./iacpa-report-controled.component.scss']
})
export class IacpaReportControledComponent {
  saharReport: any = [];
  saharReportPage: any;
  active!: boolean;
  params: any;
  name!: string;
  pageNumber = 1;
  columnsToDisplay = [
    'CustomerName',
    'NationalID',
    'ActivityNAme',
    'DurationDate',
    'OpinionName',
    'operation'
  ];
  constructor(private callData: CallDataService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('pageNumber')) {
        this.ngGetSaharReport(true);
      } else {
        this.ngGetSaharReport(false);
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

  ngGetSaharReport(state: boolean): void {
    const data: any = {
      kind: 'F31131'
    };
    if (state) {
      this.pageNumber = Number(this.params.get('pageNumber'));
      data.pageNumber = Number(this.params.get('pageNumber'));
    }
    if (this.params) {
      data.FV1 = this.params.get('nameSearch');
      this.name = this.params.get('nameSearch');
    }
    this.callData.getReportsControl(data).subscribe((saharReport) => {
      if (saharReport.msg) {
        this.saharReportPage = saharReport;
        this.saharReport = this.saharReportPage.msg;
      }
      this.active = true;
    });
  }

  ngGetPdf(item: any): void {
    if (item.pdf) {
      this.ngOpenModal(item.pdf, item);
    } else {
      const data = {
        GCode: item.GCode,
        status: 10
      };
      this.callData.getSaharPDF(data).subscribe( res => {
        item.pdf = res;
        this.ngOpenModal(res, item);
      });
    }
  }

  ngOpenModal(pdf: any, item: any): void {
    const pdfConvertor = this.base64ToArrayBuffer(pdf);
    this.dialog.open(PdfAuditorContractReportComponent, {
      data: {data: item, pdf: pdfConvertor},
      height: '90vh0',
      width: '800px'
    });
  }

  ngSearch(name: string): void {
    this.router.navigate(['SaharControl/IacpaReportControled', 1, name]);
  }


}

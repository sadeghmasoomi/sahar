import { Component, OnInit } from '@angular/core';
import {CallDataService} from '../../../../../services/sahar/call-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {
  params: any;
  formData: object = {};
  pdfFile: any;
  constructor(private callData: CallDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngGetReports();
    });
  }

  ngGetReports(): void {
    const data = {
      GCode: this.params.get('id'),
      status: this.params.get('status'),
    };
    this.callData.getSaharPDF(data).subscribe((res) => {
      this.pdfFile = res;
    });
  }
}

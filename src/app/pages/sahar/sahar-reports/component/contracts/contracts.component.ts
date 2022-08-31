import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CallDataService } from 'src/app/services/sahar/call-data.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalTestComponent} from '../../../modal-test/modal-test.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  reports: any;
  active = false;
  columnsReportToDisplay = [
    'CustomerName',
    'NationalID',
    'DurationDateStart',
    'DurationDateEnd',
    'TreatyNo',
    'TreatyDate',
    'ActivityName',
    'BudjetHorse',
    'FinalAmount',
    'ContractStatusName',
  ];

  columnsToDisplay = [
    'StatementDate',
    'AuditReportDate',
    'AuditReportSendDate',
    'OpinionName',
    'SingnName1',
    'SingnName2',
    'ReportStatusName',
    'operation'
  ];

  params!: number;
  private paramSubscription!: Subscription;
  constructor(private callData: CallDataService,
              private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,  private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(
        ( params: Params ): void => {
          this.params = params.id ;
          this.ngSaharReport();
        }
    );
  }

  ngSaharReport(): void {
    const data = {
      GCode: this.params,
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    this.callData.saharReports(data).subscribe((report) => {
      this.reports = report.msg;
      this.active = true;
    });
  }

  ngChangeStatus(Gcode: string): void {
    const data = {
      action: '3',
      GCode: Gcode,
    };
    if (confirm('برای تایید این گزاریش اطمینان دارید ؟')) {
      this.callData.changeStatusReport(data)
          .pipe(first())
          .subscribe(updateContract => {
            if (updateContract.state) {
              this.snackBar.open(updateContract.msg, 'x', {
                duration: 10000,
                direction: 'rtl',
                verticalPosition: 'top',
                horizontalPosition: 'start',
                panelClass: 'panel-success'
              });
              this.ngSaharReport();
              this.router.navigate(['/Sahar/contract/', this.params]);
            } else {
              this.snackBar.open(updateContract.msg, 'x', {
                duration: 10000,
                direction: 'rtl',
                verticalPosition: 'top',
                horizontalPosition: 'start',
                panelClass: 'panel-error'
              });
            }
          });
    }
  }

  openComment(comment: string): void {
    this.snackBar.open(comment, 'بستن', {
      duration: 100000,
      direction: 'rtl',
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}

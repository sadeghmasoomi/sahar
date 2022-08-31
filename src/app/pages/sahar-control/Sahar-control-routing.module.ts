import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IacpaContractControlComponent } from './iacpa-contract-control/iacpa-contract-control.component';
import { SaharReportControlComponent } from './sahar-report-control/sahar-report-control.component';
import { ViewPdfComponent } from './sahar-report-control/child-page/view-pdf/view-pdf.component';
import {SaharControlAuditorContractReportOldComponent} from './sahar-control-auditor-contract-report-old/sahar-control-auditor-contract-report-old.component';
import {CoTotalPositionComponent} from './co-total-position/co-total-position.component';
import { IacpaReportControledComponent } from './iacpa-report-controled/iacpa-report-controled.component';
import {ContractEditComponent} from './contract-edit/contract-edit.component';
import { IacpaContractControledComponent } from './iacpa-contract-controled/iacpa-contract-controled.component';

const routesSaharControl: Routes = [
  { path: '', component: IacpaContractControlComponent, pathMatch: 'full'},
  { path: 'IacpaContractControl', component: IacpaContractControlComponent},
  { path: 'IacpaContractControl/:pageNumber', component: IacpaContractControlComponent},
  { path: 'IacpaContractControl/:pageNumber/:nameSearch', component: IacpaContractControlComponent},
  { path: 'ContractEdit', component: ContractEditComponent},
  { path: 'ContractEdit/:validation', component: ContractEditComponent},
  { path: 'IacpaReportControl', component: SaharReportControlComponent},
  { path: 'IacpaReportControl/:pageNumber', component: SaharReportControlComponent},
  { path: 'IacpaReportControl/:pageNumber/:nameSearch', component: SaharReportControlComponent},
  { path: 'IacpaReportControled', component: IacpaReportControledComponent},
  { path: 'IacpaReportControled/:pageNumber', component: IacpaReportControledComponent},
  { path: 'IacpaReportControled/:pageNumber/:nameSearch', component: IacpaReportControledComponent},
  { path: 'IacpaContractControled', component: IacpaContractControledComponent},
  { path: 'IacpaContractControled/:pageNumber', component: IacpaContractControledComponent},
  { path: 'IacpaContractControled/:pageNumber/:nameSearch', component: IacpaContractControledComponent},
  {path: 'ViewPdf/:status/:id', component: ViewPdfComponent,  data: {title: 'نمایش چی دی اف'}},
  { path: 'AuditorContractReportOldAdmin',
    component: SaharControlAuditorContractReportOldComponent, data: {title: 'قر ارداد ها و گزارشات'}},
  { path: 'CoTotalPosition',
    component: CoTotalPositionComponent, data: {title: 'قر ارداد ها و گزارشات'}}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesSaharControl)
  ],
  exports: [RouterModule]
})

export class SaharContolRoutingModule { }

export const RouteComponentSaharPath = [
  IacpaContractControlComponent,
  SaharReportControlComponent,
  ViewPdfComponent,
  SaharControlAuditorContractReportOldComponent,
  CoTotalPositionComponent,
  IacpaReportControledComponent,
  ContractEditComponent,
  IacpaContractControledComponent,
];

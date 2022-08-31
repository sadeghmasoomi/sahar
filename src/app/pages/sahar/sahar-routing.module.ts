import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LegalEntitiesComponent } from './legal-entities/legal-entities.component';
import {CompanyComponent} from './legal-entities/child-page/company/company.component';
import {AuditContractProcessComponent} from './audit-contract-process/audit-contract-process.component';
import { OperationContractComponent } from './audit-contract-process/component/operation-contract/operation-contract.component';
import {
    AuditContractProcessManagerAcceptComponent
} from './audit-contract-process-manager-accept/audit-contract-process-manager-accept.component';
import { UpdateContractComponent } from './audit-contract-process/component/update-contract/update-contract.component';
import { SaharReportsComponent } from './sahar-reports/sahar-reports.component';
import { AddReportComponent } from './sahar-reports/component/contracts/child-page/add-report/add-report.component';
import { PersonalEntityComponent } from './personal-entity/personal-entity.component';
import { PersonComponent } from './personal-entity/child-page/person/person.component';
import { ViewPdfComponent } from './sahar-reports/component/contracts/child-page/view-pdf/view-pdf.component';
import { ContractsComponent } from './sahar-reports/component/contracts/contracts.component';
import {
  AuditReportProcessManagerAcceptComponent
} from './audit-report-process-manager-accept/audit-report-process-manager-accept.component';
import {AuditorContractReportComponent} from './auditor-contract-report/auditor-contract-report.component';
import {AuditorContractReportOldComponent} from './auditor-contract-report-old/auditor-contract-report-old.component';
import {ContractCancelComponent} from './contract-cancel/contract-cancel.component';
import {FirmActivitionComponent} from './firm-activition/firm-activition.component';
import {CoInfoRecordComponent} from './co-info-record/co-info-record.component';
import { ConvertNationalIdComponent } from './convert-national-id/convert-national-id.component';
import {FirmContractReportComponent} from "./firm-contract-report/firm-contract-report.component";

const routesSAHAR: Routes = [
  { path: 'Legalentitiesandindividuals', component: LegalEntitiesComponent,  children: [
      {path: 'company/:id', component: CompanyComponent,  data: {title: 'شرکت'}},
    ]},
    { path: '',   children: [
      {path: 'AuditContractProcess', component: AuditContractProcessComponent,  data: {title: 'قراردادها - ثبت'}, children: [
                    {path: 'contract/:state/:id', component: OperationContractComponent,  data: {title: 'عملیات روی قرارداد ها'}},
                    {path: 'updateContract/:id', component: UpdateContractComponent,  data: {title: 'ذخیره قرادار داد'}},
                ]}, {
                path: 'AuditContractProcessManagerAccept',
                component: AuditContractProcessManagerAcceptComponent,  data: {title: 'قراردادها - تائید شریک'}},
        {path: 'Personalentitiesandindividuals', component: PersonalEntityComponent,  data: {title: 'اشخاص حقیقی'}, children: [
                    {path: 'person/:id', component: PersonComponent,  data: {title: 'شخص'}},
                ]},
        {path: 'CoInfoRecord', component: CoInfoRecordComponent,  data: {title: 'ثبت نام شرکت در سامانه جامع تجارت'}},
        {path: 'AuditReportProcess', component: SaharReportsComponent,  data: {title: 'لیست قراردادها (گزارشات - ثبت)'}},
        {path: 'AuditReportProcess/:pageNumber', component: SaharReportsComponent,  data: {title: 'لیست قراردادها (گزارشات - ثبت)'}},
        {path: 'AuditReportProcess/:pageNumber/:nameSearch', component: SaharReportsComponent,  data: {title: 'لیست قراردادها (گزارشات - ثبت)'}},
        {path: 'FirmActivition', component: FirmActivitionComponent,  data: {title: 'تسویه حساب قرارداد'}},
        {path: 'FirmActivition/:nameSearch', component: FirmActivitionComponent,  data: {title: 'تسویه حساب قرارداد'}},
        {path: 'contract/:id', component: ContractsComponent,  data: {title: 'افزودن گزارش'}, children: [
                    {path: 'addReport', component: AddReportComponent,  data: {title: 'افزودن گزارش'}},
                    {path: 'ViewPdf/:status/:id', component: ViewPdfComponent,  data: {title: 'نمایش چی دی اف'}},
                ]},
        {path: 'AuditReportProcessManagerAccept', component: AuditReportProcessManagerAcceptComponent,
                data: {title: 'گزارشات - تائید مدیر'}},
        {path: 'ContractCancel', component: ContractCancelComponent,
          data: {title: 'فسخ قرارداد'}},
        { path: 'AuditorContractReport', component: AuditorContractReportComponent, data: {title: 'گزارش - قر ارداد ها و گزارشات'} },
        { path: 'AuditorContractReport/:pageNumber', component: AuditorContractReportComponent, data: {title: 'گزارش - قر ارداد ها و گزارشات'} },
        { path: 'AuditorContractReport/:pageNumber/:nameSearch', component: AuditorContractReportComponent, data: {title: 'گزارش - قر ارداد ها و گزارشات'} },
        { path: 'AuditorContractReportOld', component: AuditorContractReportOldComponent, data: {title: 'قر ارداد ها و گزارشات'} },
        {path: 'ConvertNationalId', component: ConvertNationalIdComponent,  data: {title: 'اصلاح و انتقال شناسه ملی'}},
        {path: 'FirmContractReport', component: FirmContractReportComponent,  data: {title: 'اصلاح و انتقال شناسه ملی'}},
        ]},


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesSAHAR)
  ],
  exports: [RouterModule]
})

export class SaharRoutingModule { }

export const RouteComponentSaharPath = [
  LegalEntitiesComponent,
  CompanyComponent,
  AuditContractProcessComponent,
  OperationContractComponent,
  AuditContractProcessManagerAcceptComponent,
  UpdateContractComponent,
  SaharReportsComponent,
  AddReportComponent,
  PersonalEntityComponent,
  ContractsComponent,
  PersonComponent,
  ViewPdfComponent,
  AuditReportProcessManagerAcceptComponent,
  AuditorContractReportComponent,
  AuditorContractReportOldComponent,
  ContractCancelComponent,
  FirmActivitionComponent,
  CoInfoRecordComponent,
  ConvertNationalIdComponent,
  FirmContractReportComponent
];

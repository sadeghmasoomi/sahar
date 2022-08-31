import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouteComponentSaharPaymentPath, SaharPaymentRoutingModule} from './sahar-payment-routing.module';
import { SaharPaymentComponent } from './sahar-payment.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AuditorIncomAddComponent } from './auditor-incom-add/auditor-incom-add.component';
import {MatInputModule} from '@angular/material/input';
import {NgxCurrencyModule} from 'ngx-currency';
import {MatSelectModule} from '@angular/material/select';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { AuditorIncomAddDetialComponent } from './auditor-incom-add-detial/auditor-incom-add-detial.component';
import {SafePipe} from '../pipes/safe.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from "@angular/material/sort";
import { AuditorIncomAddFile169Component } from './auditor-incom-add-file169/auditor-incom-add-file169.component';
import {EducationModule} from "../education/education.module";

export const customCurrencyMaskConfig = {
  align: 'center',
  allowNegative: true,
  allowZero: false,
  decimal: ',',
  precision: 0,
  prefix: '',
  suffix: '',
  thousands: ',',
  nullable: true
};

@NgModule({
  declarations: [
    SaharPaymentComponent,
    RouteComponentSaharPaymentPath,
    AuditorIncomAddComponent,
    AuditorIncomAddDetialComponent,
    SafePipe,
    AuditorIncomAddFile169Component,
  ],
  imports: [
    CommonModule,
    SaharPaymentRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    MatInputModule,
    MatSelectModule,
    DpDatePickerModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    EducationModule,
  ]
})
export class SaharPaymentModule { }

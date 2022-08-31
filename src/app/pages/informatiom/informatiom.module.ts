import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InformatiomRoutingModule, RouteComponentInformatiomPath} from './informatiom-routing.module';
import {FlexModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EducationModule} from '../education/education.module';
import {MatButtonModule} from '@angular/material/button';
import { AddInformatiomComponent } from './modal/add-informatiom/add-informatiom.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {NgxCurrencyModule} from 'ngx-currency';

export const customCurrencyMaskConfig2 = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};
@NgModule({
  declarations: [RouteComponentInformatiomPath, AddInformatiomComponent],
  imports: [
    CommonModule,
    InformatiomRoutingModule,
    FlexModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    EducationModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DpDatePickerModule,
    NgxCurrencyModule,
  ]
})
export class InformatiomModule { }

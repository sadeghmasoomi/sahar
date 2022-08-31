import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import {RouteComponentSaharPath, SaharContolRoutingModule} from './Sahar-control-routing.module';
import { AcceptComponent } from './iacpa-contract-control/modal/accept/acsept.component';
import { UnAcceptComponent } from './iacpa-contract-control/modal/un-accept/un-acsept.component';
import { AcceptProvisionalComponent } from './iacpa-contract-control/modal/accept-provisional/acsept-provisional.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {AcceptProvisionalComponentTwe} from './sahar-report-control/modal/accept-provisional/accept-provisional.component';
import {UnAcceptComponentTwe} from './sahar-report-control/modal/un-accept/un-accept.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {EducationModule} from '../education/education.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {NgxCurrencyModule} from 'ngx-currency';
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
    RouteComponentSaharPath,
    AcceptComponent,
    UnAcceptComponent,
    AcceptProvisionalComponent,
    UnAcceptComponentTwe,
    AcceptProvisionalComponentTwe
  ],
  imports: [
    SaharContolRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    MatExpansionModule,
    EducationModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    DpDatePickerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ]
})
export class SaharControlModule {}

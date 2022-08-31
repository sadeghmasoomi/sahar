import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouteComponentSaharPath, SaharRoutingModule} from './sahar-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropDirective} from '../../layout/directive/drag-drop.directive';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {NgxCurrencyModule} from 'ngx-currency';
import {PdfAuditorContractReportComponent} from './auditor-contract-report/pdf-auditor-contract-report/pdf-auditor-contract-report.component';
import {EducationModule} from '../education/education.module';
import { ModalTestComponent } from './modal-test/modal-test.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConvertNationalIdAddComponent } from './convert-national-id/convert-national-id-add/convert-national-id-add.component';
import { ConvertNationalIdSetComponent } from './convert-national-id/convert-national-id-add/convert-national-id-set/convert-national-id-set.component';
import { FirmContractReportComponent } from './firm-contract-report/firm-contract-report.component';

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
        PdfAuditorContractReportComponent,
        DragDropDirective,
        ModalTestComponent,
        ConvertNationalIdAddComponent,
        ConvertNationalIdSetComponent,
        FirmContractReportComponent,
    ],
    exports: [
        DragDropDirective
    ],
    imports: [
        CommonModule,
        SaharRoutingModule,
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
        MatTabsModule,
        DpDatePickerModule,
        MatExpansionModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        EducationModule,
        NgxExtendedPdfViewerModule,
        MatPaginatorModule
    ]
})
export class SaharModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MembersRoutingModule, RouterComponentModule} from './members-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddFirmDtlComponent } from './firm-auditor/add-firm-dtl/add-firm-dtl.component';
import { EditInfoUsderComponent } from './user-info/edit-info-usder/edit-info-usder.component';
import {MatTabsModule} from '@angular/material/tabs';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { UserEducationUpdateComponent } from './user-info-education/user-education-update/user-education-update.component';
import { UserInfoImageUpdateComponent } from './user-info/user-info-image-update/user-info-image-update.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { UserInfoResumeUpdateComponent } from './user-info-resume/user-info-resume-update/user-info-resume-update.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EducationModule} from '../education/education.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FirmAuditorAcceptComponent } from './firm-auditor-accept/firm-auditor-accept.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    RouterComponentModule,
    AddFirmDtlComponent,
    EditInfoUsderComponent,
    UserEducationUpdateComponent,
    UserInfoImageUpdateComponent,
    UserInfoResumeUpdateComponent,
    FirmAuditorAcceptComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MembersRoutingModule,
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatExpansionModule,
        NgxPaginationModule,
        MatIconModule,
        MatToolbarModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTabsModule,
        DpDatePickerModule,
        NgxExtendedPdfViewerModule,
        EducationModule,
        MatTooltipModule,
        NgxMatSelectSearchModule,
        MatSortModule,
    ]
})

export class MembersModule {}

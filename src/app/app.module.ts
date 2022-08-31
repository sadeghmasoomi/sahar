import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, RouteComponentPath} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavComponent} from './layout/nav/nav.component';
import {HeaderComponent} from './layout/header/header.component';
import {OrderModule} from 'ngx-order-pipe';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {NotificationComponent} from './layout/header/component/notification/notification.component';
import {QuestionAndAnswerComponent} from './layout/header/component/question-and-answer/question-and-answer.component';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
import {HttpErrorInterceptor} from './interceptors/HttpErrorInterceptor';
import {LoaderComponent} from './loader/loader.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {EducationModule} from './pages/education/education.module';
import {ScrollToBottomDirective} from './layout/directive/scroll-to-bottom.directive';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {LoaderService} from './loader/loader.service';
import {LoaderInterceptor} from './loader/loader.interceptors';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginator} from './model/CustomPaginator';
import { DateCheckerDirective } from './layout/directive/date-checker.directive';
import {NgxCurrencyModule} from 'ngx-currency';
import {MatTableModule} from '@angular/material/table';
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
        AppComponent,
        HeaderComponent,
        BreadcrumbComponent,
        NotificationComponent,
        QuestionAndAnswerComponent,
        NavComponent,
        RouteComponentPath,
        LoaderComponent,
        ScrollToBottomDirective,
        DateCheckerDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        MatButtonToggleModule,
        MatListModule,
        MatDialogModule,
        MatRippleModule,
        MatSelectModule,
        MatAutocompleteModule,
      MatTableModule,
        MatSlideToggleModule,
        OrderModule,
        MatExpansionModule,
        NgxExtendedPdfViewerModule,
        EducationModule,
      NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        Title,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        LoaderService,
        {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
      { provide: MatPaginatorIntl, useValue: CustomPaginator() }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

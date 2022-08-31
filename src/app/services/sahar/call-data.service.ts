import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
const url = environment.baseApi + '/saharApi';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class CallDataService {

  constructor(private http: HttpClient) { }
  private httpOption: any = {
    headers: {
      authorization: JSON.parse(sessionStorage.getItem('currentUser') as string).token
    }
  };


  public worker: any;

  getCompany(data: any): Observable<any> {
    return this.http.post<any>(url + '/getCompany', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getCompany', data))
      );
  }

  firmIncomeData(data: any): Observable<any> {
    return this.http.post<any>(url + '/FirmIncomeData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('FirmIncomeData', data))
      );
  }

  getFirmIncomeDetailFormData(): Observable<any> {
    return this.http.post<any>(url + '/getFirmIncomeDetailFormData', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmIncomeDetailFormData', {}))
      );
  }

  updateFirmIncomeDetail(data: any): Observable<any> {
    return this.http.post<any>(url + '/updateFirmIncomeDetail', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('updateFirmIncomeDetail', data))
      );
  }

  FirmIncomeFile(data: any, type: string): Observable<any> {
    return this.http.post<any>(url + '/FirmIncomeFile/' + type, data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('FirmIncomeFile', data))
      );
  }

  getFirmIncomeHeaderFormData(): Observable<any> {
    return this.http.post<any>(url + '/getFirmIncomeHeaderFormData', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFirmIncomeHeaderFormData', {}))
      );
  }

  updateFirmIncomeHeader(data: any): Observable<any> {
    return this.http.post<any>(url + '/updateFirmIncomeHeader', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('updateFirmIncomeHeader', data))
      );
  }



  adminFirmIncomeData(data: any): Observable<any> {
    return this.http.post<any>(url + '/AdminFirmIncomeData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('AdminFirmIncomeData', data))
      );
  }
  getContractActivation(data: any): Observable<any> {
    return this.http.post<any>(url + '/getContractActivation', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getContractActivation', data))
      );
  }

  getFormCompany(): Observable<any> {
    return this.http.post<any>(url + '/CompanyForm', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('CompanyForm', {}))
      );
  }

  getFormReport(data: any): Observable<any> {
    return this.http.post<any>(url + '/getReportForm', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getReportForm', data))
      );
  }

  getPersonFormData(): Observable<any> {
    return this.http.post<any>(url + '/getPersonFormData', {}, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getPersonFormData', {}))
      );
  }

  updateFormCompany(data: any): Observable<any> {
    return this.http.post<any>(url + '/updateCompany', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('updateCompany', data))
      );
  }

  getContract(data: any): Observable<any> {
    return this.http.post<any>(url + '/getContract', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getContract', data))
      );
  }

  getCompanyData(data: any): Observable<any> {
    return this.http.post<any>(url + '/getCompanyData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getCompanyData', data))
      );
  }

  getReportData(data: any): Observable<any> {
    return this.http.post<any>(url + '/getReportData', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getReportData', data))
      );
  }

  getSingleContract(data: any): Observable<any> {
    return this.http.post<any>(url + '/singleContract', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('singleContract', data))
      );
  }

  contractForm(): Observable<any> {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    return this.http.post<any>(url + '/ContractForm', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('ContractForm', data))
      );
  }

  contractFormEditJameye(): Observable<any> {
    const data = {
      FirminfoGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode
    };
    return this.http.post<any>(url + '/getFormDataEditJameye', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getFormDataEditJameye', data))
      );
  }

  operationContract(data: any): Observable<any> {
    return this.http.post<any>(url + '/ContractUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('ContractUpdate', data))
      );
  }

  ContractUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/ContractUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('ContractUpdate', data))
      );
  }

  changeStatus(data: any): Observable<any> {
    return this.http.post<any>(url + '/changeStatus', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('changeStatus', data))
      );
  }

  cancelContracts(data: any): Observable<any> {
    return this.http.post<any>(url + '/cancelContracts', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('cancelContracts', data))
      );
  }

  changeStatusReport(data: any): Observable<any> {
    return this.http.post<any>(url + '/reportChangeStatus', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('reportChangeStatus', data))
      );
  }

  getSignContract(data: any): Observable<any> {
    return this.http.post<any>(url + '/getSignContract', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getSignContract', data))
      );
  }

  getContractsForCancel(data: any): Observable<any> {
    return this.http.post<any>(url + '/getContractsForCancel', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getContractsForCancel', data))
      );
  }

  getSaharControl(data: any): Observable<any> {
    return this.http.post<any>(url + '/saharControl', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('saharControl', data))
      );
  }

  getSaharReport(data: any): Observable<any> {
    return this.http.post<any>(url + '/saharReportControl', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('saharReportControl', {}))
      );
  }

  getReportsControl(data: any): Observable<any> {
    return this.http.post<any>(url + '/getReportsControl', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getReportsControl', {}))
      );
  }

  saharControlAccept(data: any): Observable<any> {
    return this.http.post<any>(url + '/saharControlAccept', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('saharControlAccept', data))
      );
  }

  saharReportAccept(data: any): Observable<any> {
    return this.http.post<any>(url + '/saharReportAccept', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('saharReportAccept', data))
      );
  }


  saharReports(data: any): Observable<any> {
    return this.http.post<any>(url + '/getSaharReports', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getSaharReports', data))
      );
  }

  getPreson(data: any): Observable<any> {
    return this.http.post<any>(url + '/getPerson', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getPerson', data))
      );
  }

  operationPerson(data: any): any  {
    return this.http.post<any>(url + '/person', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('person', data))
      );
  }

  addReport(data: any): Observable<any> {
    return this.http.post<any>(url + '/addReport', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('addReport', data))
      );
  }

  updateReports(data: any): Observable<any> {
    return this.http.post<any>(url + '/updateReports', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('updateReports', data))
      );
  }

  getSaharPDF(data: any): Observable<any> {
    return this.http.post<any>(url + '/getSaharPDF', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getSaharPDF', data))
      );
  }

  getReportsContracts(data: any): Observable<any> {
    return this.http.post<any>(url + '/reportsContracts', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('reportsContracts', data))
      );
  }

  reportsSingleContract(data: any): Observable<any> {
    return this.http.post<any>(url + '/reportsSingleContract', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('reportsSingleContract', data))
        );
  }

  getSingReports(data: any): Observable<any> {
    return this.http.post<any>(url + '/getSingReports', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getSingReports', data))
      );
  }

  getSingleReports(data: any): Observable<any> {
    return this.http.post<any>(url + '/getSingleReports', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getSingleReports', data))
      );
  }

  firmContractReportPDF(data: any): Observable<any> {
    return this.http.post<any>(url + '/firmContractReportPDF', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('firmContractReportPDF', data))
        );
  }

  firmContractReport(data: any): Observable<any> {
    data.LoactionGcode =  JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    return this.http.post<any>(url + '/firmContractReport', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('firmContractReport', data))
        );
  }

  firmContractDetails(data: any): Observable<any> {
    return this.http.post<any>(url + '/firmContractDetails', data, this.httpOption)
        .pipe(
            retry(1),
            catchError(this.handleError('firmContractDetails', data))
        );
  }

  FirmContractReport(data: any): Observable<any> {
    return this.http.post<any>(url + '/getReportInfo', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getReportInfo', data))
      );
  }






  firmContractActivation(data: any): Observable<any> {
    return this.http.post<any>(url + '/FirmContractActivation', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('FirmContractActivation', data))
      );
  }

  UpdatePDF(data: any): Observable<any> {
    return this.http.post<any>(url + '/UpdatePDF', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('UpdatePDF', data))
      );
  }
  getCompanyFromApi(data: { NationalID: string }): Observable<any> {
    return this.http.post<any>(url + '/getCompanyFromApi', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getCompanyFromApi', data))
      );
  }

  getCompanyDataFromApi(data: { NationalID: string }): Observable<any> {
    return this.http.post<any>(url + '/getCompanyDataFromApi', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('getCompanyDataFromApi', data))
      );
  }

  getCustomerInfoOld(data: any): Observable<any> {
    return this.http.post<any>(url + '/CustomerInfoOld', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('CustomerInfoOld', data))
      );
  }

  customerInfoOldUpdate(data: any): Observable<any> {
    return this.http.post<any>(url + '/customerInfoOldUpdate', data, this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError('customerInfoOldUpdate', data))
      );
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myWorkbook: XLSX.WorkBook = { Sheets: { data: myWorksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myWorkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  public exportExcel(tableId: string, name?: string[]): void {
    const prefix = name || 'ReportExcel';
    const fileName = `ReportExcel`;
    const targetTableElm = document.getElementById(tableId);
    const wb = XLSX.utils.table_to_book(targetTableElm, {sheet: prefix} as XLSX.Table2SheetOpts);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

  // error handling
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    // console.log(message);
  }
}

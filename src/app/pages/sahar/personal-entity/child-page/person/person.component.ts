import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CallDataService } from 'src/app/services/sahar/call-data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  formCompany: any;
  citeies: any = [];
  citeiesB: any = [];
  formData: any = {};
  provinces!: [];
  provincesB!: [];
  params: any;
  fullCard = false;
  datePickerConfig = {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ngGetFormCompany();
  }

  ngGetFormCompany(): void {
    this.callData.getPersonFormData().subscribe((res) => {
      this.formCompany = res.msg;
      this.route.paramMap.subscribe((params) => {
        this.fullCard = false;
        this.params = params.get('id');
        const data = {
          NationalId: params.get('id')
        };
        this.callData.getPreson(data).subscribe((person) => {
          if (person.state && person.msg.length > 0) {
            this.formData = {};
            this.formData = {
              Address: person.msg[0].Address,
              BirthDate: person.msg[0].BirthDate,
              DissolutionDate: person.msg[0].DissolutionDate,
              EconomyCode: person.msg[0].EconomyCode,
              FatherName: person.msg[0].FatherName,
              FirmInfoGCode: person.msg[0].FirmInfoGCode,
              FirmStatus: person.msg[0].FirmStatus,
              FirmType: person.msg[0].FirmType,
              FirstName: person.msg[0].FirstName,
              FiscalYear: person.msg[0].FiscalYear,
              FoundationDate: person.msg[0].FoundationDate,
              Gcode: person.msg[0].Gcode,
              GeneralID: person.msg[0].GeneralID,
              GnrActivitySubjectGcode: person.msg[0].GnrActivitySubjectGcode,
              GnrActivityTypeGcode: person.msg[0].GnrActivityTypeGcode,
              GnrPassportTypeGCode: person.msg[0].GnrPassportTypeGCode,
              IdNumber: person.msg[0].IdNumber,
              LastName: person.msg[0].LastName,
              MainActivity: person.msg[0].MainActivity,
              NationalID: person.msg[0].NationalID,
              NationalId: person.msg[0].NationalId,
              PassportID: person.msg[0].PassportID,
              SexName: person.msg[0].SexName,
              StatusDsc: person.msg[0].StatusDsc,
              ZipCode: person.msg[0].ZipCode,
              action: person.msg[0].action,
              citeies: person.msg[0].citeies,
              citeies_Birth: person.msg[0].citeies_Birth,
            };
            this.fullCard = true;
            const personKeys = Object.keys(person.msg[0]);
            for (const item of personKeys) {
              if (item === 'provinces' || item === 'provinces_Birth') {
                for (const sub of this.formCompany) {
                  if (sub.enName === item) {
                    if (sub.enName === 'provinces') {
                      this.provinces = sub.data.find((element: any) => element.name === person.msg[0].provinces).citeies;
                      this.selectProvinces(this.provinces);
                    } else {
                      this.provincesB = sub.data.find((element: any) => element.name === person.msg[0].provinces_Birth).citeies;
                      this.selectProvincesB(this.provincesB);
                    }
                  }
                }
              }
            }
          }
        });
      });
    });
  }

  selectProvinces(value: any): void {
    this.citeies = value;
  }

  selectProvincesB(value: any): void {
    this.citeiesB = value;
  }

  addPerson(): void {
    this.formData.NationalId = this.params.get('id');
    this.formData.action = 1;
    this.formData.FirmInfoGCod = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    this.callData.operationPerson(this.formData).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
      } else {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
      }
    });
  }

  updatePerson(): void {
    this.formData.NationalId = this.params.get('id');
    this.formData.action = 2;
    this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    this.callData.operationPerson(this.formData).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
      } else {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
      }
    });
  }

  dateMode(value: string , name: string): void {
    const val = value.replace('/', '');
    const val2 = val.replace('/', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}

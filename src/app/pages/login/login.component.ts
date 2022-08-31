import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-100px'})),
      transition('* => *', [
        style({left: '-100px'}),
        animate(25000, style({left: '100%'}))
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  params: any;
  messages: any;
  state = 0;
  scrollDone(): void {
    this.state++;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
      this.loginUrl();
    // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordTwo: ['']
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }

  get f(): any { return this.loginForm.controls; }

  getToken(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const Data = {
      NationalId: this.f.username.value,
      Password: this.f.password.value
    };
    this.loading = true;
    this.authenticationService.getToken(Data)
      .pipe(first())
      .subscribe((data => {
        if (data.state) {
          this.snackBar.open(data.msg, 'x', {

            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        } else {
          this.snackBar.open(data.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      }));
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const Data = {
      NationalId: this.f.username.value,
      Password: this.f.password.value,
      DailyPass: this.f.passwordTwo.value
    };
    this.authenticationService.login(Data)
      .pipe(first())
      .subscribe(
        data => {
          if (data.state) {
            this.snackBar.open('شما با موفقیت وارد شدید', 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
            this.router.navigate(['/']);
          } else {
            this.snackBar.open(data.msg, 'x', {
              duration: 6000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-error'
            });
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  loginUrl(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (this.params.get('token')) {
        const data = {
          token: this.params.get('token')
        };
        this.authenticationService.loaginUrl(data)
          .pipe(first())
          .subscribe(
            resUser => {
              if (resUser.state) {
                this.snackBar.open('شما با موفقیت وارد شدید', 'x', {
                  duration: 10000,
                  direction: 'rtl',
                  verticalPosition: 'top',
                  horizontalPosition: 'start',
                  panelClass: 'panel-success'
                });
                this.router.navigate(['/']);
              } else {
                this.snackBar.open(resUser.msg, 'x', {
                  duration: 6000,
                  direction: 'rtl',
                  verticalPosition: 'top',
                  horizontalPosition: 'start',
                  panelClass: 'panel-error'
                });
              }
            });
      }

    });
  }

  ngGetMessages(): void {
    this.authenticationService.getMessages().subscribe( res => {
      this.messages = res;
    });
  }

}

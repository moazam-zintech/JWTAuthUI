import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import ValidateForm from '../../Helpers/validateform';
import { AuthService } from '../../Service/auth.service';
import { UserStoreService } from '../../Service/user-store.service';
import { Console } from 'node:console';
import { strict } from 'node:assert';
import { stringify } from 'node:querystring';
import { ResetPasswordService } from '../../Service/reset-password.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public fullName: string = '';
  public isValidEmail: boolean = true;
  public resetPasswordEmail!: string;
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.form.valid) {
      this.auth.signIn(this.form.value).subscribe({
        next: (res: any) => {
          //  this.toast.success({detail: "Success",summary:res.message,duration:5000})

          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);

          this.route.navigate(['/Dashboard']);
          console.log(res.accessToken);

          let tokenPayload = this.auth.decodeToken();

          console.log('Here we get a:' + tokenPayload.name);

          this.userStore.setFullNameFromStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
        },
      });
    } else {
      //Toaster
      ValidateForm.ValidateAllFormFields(this.form);
      alert('forms is invalid');
    }
  }
  checkValidateEmail(event: string) {
    const value = event;
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
  confirmToSend() {
    if (this.checkValidateEmail(this.resetPasswordEmail)) {
      // this.resetPasswordEmail= "";
      const btnRef = document.getElementById('closebutton');
      btnRef?.click();

      console.log('Test' + this.resetPasswordEmail);
      //Api to be called
      this.resetService
        .sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (res) => {
            this.resetPasswordEmail= "";
            const btnRef = document.getElementById('closebutton');
            btnRef?.click();
          },
          error: (err) => {},
        });
    } else {
      this.resetPasswordEmail = '';
    }
  }
}
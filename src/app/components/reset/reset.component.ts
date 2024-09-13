import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResetPassword } from '../../Model/reset-password.model';
import { PassThrough } from 'stream';
import { confirmPasswordValidator } from '../../Helpers/confirm-password.validator';
import ValidateForm from '../../Helpers/validateform';
import { ResetPasswordService } from '../../Service/reset-password.service';
import { NgToastService } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        password: '', //[null, Validators.required],
        confirmPassword: '', //[null, Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
    this.activatedRoute.queryParams.subscribe((val) => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
      console.log(this.emailToReset);
      console.log(this.emailToken);
    });
  }
  reset() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword =
        this.resetPasswordForm.value.password;

      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.emailToken = this.emailToken;

      console.log(this.resetPasswordObj.confirmPassword);
      console.log(this.resetPasswordObj.newPassword);
      console.log(this.resetPasswordObj.email);
      console.log(this.resetPasswordObj.emailToken);

      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          this.toast.success('Success');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toast.danger('Any issue accure');
        },
      });
      {
      }
    } else {
      ValidateForm.ValidateAllFormFields(this.resetPasswordForm);
    }
  }
}

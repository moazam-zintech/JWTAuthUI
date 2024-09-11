import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import ValidateForm from '../../Helpers/validateform';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private http: HttpClient,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    });
  }
  submit(): void {
    if (this.form.valid) {
      this.http
        .post(
          'https://localhost:7270/api/Auth/Register',
          this.form.getRawValue()
        )
        .subscribe(() => this.route.navigate(['Login']));
    } else {
      ValidateForm.ValidateAllFormFields(this.form);
    }
  }
}
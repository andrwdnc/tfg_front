import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

interface MyData {
  result: [
    {
      name: string;
      email: string;
      pass: string;
      type: string;
    }
  ];
  token:any
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public itemForm: FormGroup;
  public submitted = false;
  public user: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.itemForm.controls;
  }

  submit(): void {
    this.submitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    const formValues = this.itemForm.value;
    const user = { name: formValues.user, pass: formValues.pass };
    this.http
      .post<MyData>('http://localhost:3000/api/v1/usuarios/login', user, { withCredentials: true})
      .subscribe(
        (data: MyData) => {
          localStorage.setItem("token",data.token);
          localStorage.setItem(
            'session',
            JSON.stringify({
              name: btoa(data.result[0].name),
              mail: btoa(data.result[0].email),
              type: btoa(data.result[0].type),
            })
          );
          this._snackBar.open('Logueado con exito.',"", { duration: 3000 });
          this.router.navigate(['/']);
        },
        (error) => {
          this._snackBar.open('Error', error.error.error, { duration: 3000 });
        }
      );
  }
}

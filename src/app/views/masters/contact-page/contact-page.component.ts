import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  msg(){
    if(this.itemForm.invalid){
      return
    }
    this._snackBar.open("Mensaje enviado correctamente.","", { duration: 3000 });
    this.itemForm.reset();
    this.router.navigate(["/"])
  }

}



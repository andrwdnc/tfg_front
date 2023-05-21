import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  public submitted = false;
  public itemForm: FormGroup;
  public title = "Creacion"
  public btt = "Crear"
  
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef1: MatDialogRef<CreateEventComponent>,
    public dialogRef2: MatDialogRef<CreateEventComponent>,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tickets: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
   }

  ngOnInit(): void {
    if(this.data){
      this.title = "Edicion"
      this.btt = "Editar"
      this.itemForm = this.fb.group({
        name: [this.data.name, [Validators.required]],
        price: [this.data.price, [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        date: [this.data.date, [Validators.required]],
        description: [this.data.description, [Validators.required]],
        tickets: [this.data.tickets, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      });
    }
  }

  submit(){
    this.submitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    const event = this.itemForm.value
    if(this.data){
      this.http.patch('http://localhost:3000/api/v1/eventos/'+this.data._id, event).subscribe((data)=>{
      })
      this.dialogRef1.close(true);
      this.dialogRef2.close(true);
      this._snackBar.open('Evento actualizdo con exito.',"", { duration: 3000 });
    } else{
      event.img = "../../../../assets/img/logo_play-1-removebg-preview.png"
      this.http.post('http://localhost:3000/api/v1/eventos/', event).subscribe((data)=>{
      })
      this.dialogRef1.close(true);
      this._snackBar.open('Evento creado con exito.',"", { duration: 3000 });
    }

    

  }

  cerrar(){
    this.dialogRef1.close(false);
  }

}

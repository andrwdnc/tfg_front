import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
  ) { }

  ngOnInit(): void {
  }

  volver(): void {
    this.dialogRef.close(false);
  }

  eliminar(): void {
    this.http
    .delete("http://localhost:3000/api/v1/eventos/" + this.data)
    .subscribe((data) => {
      if (data) {
        this.dialogRef.close(true);
        this._snackBar.open("Evento eliminado con exito.", "", {
          duration: 3000,
        });
      }
    });
  }

}

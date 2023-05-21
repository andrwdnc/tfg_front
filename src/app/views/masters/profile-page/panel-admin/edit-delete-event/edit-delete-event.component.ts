import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ObservableLike } from "rxjs";
import { CreateEventComponent } from "../create-event/create-event.component";
import { ConfirmDeleteComponent } from "./confirm-delete/confirm-delete.component";

@Component({
  selector: "app-edit-delete-event",
  templateUrl: "./edit-delete-event.component.html",
  styleUrls: ["./edit-delete-event.component.scss"],
})
export class EditDeleteEventComponent implements OnInit {
  public myData: any;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditDeleteEventComponent>,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http.get("http://localhost:3000/api/v1/eventos/").subscribe((data) => {
      this.myData = data;
      this.myData = this.myData.eventos;
    });
  }

  cerrar(){
    this.dialogRef.close(true)
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
      data: id,
      panelClass: "modal-class",
      width: "380px",
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dialogRef.close(true);
      }
    })
  }

  edit(event: Object){
    const dialofRef = this.dialog.open(CreateEventComponent,{
      data: event,
      panelClass: "modal-class",
      width: "720px",
      disableClose: true,
    })
    dialofRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dialogRef.close(true);
      }
      
    })
  }
}

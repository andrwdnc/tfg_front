import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { EventModalComponent } from "./event-modal/event-modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CheckoutPageComponent } from "./checkout-page/checkout-page.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"],
})
export class EventsPageComponent implements OnInit {
  public itemForm: FormGroup;
  public busquedaForm: FormGroup;
  public myData: any;
  public type = false;
  public valorInput: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      event: [""],
    });
    this.busquedaForm = this.fb.group({
      name: [""],
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.http.get("http://localhost:3000/api/v1/eventos/").subscribe((data) => {
      this.myData = data;
      this.myData = this.myData.eventos;
    });
    if (
      atob(JSON.parse(localStorage.getItem("session") ?? "").type) === "Admin"
    ) {
      this.type = true;
    }
  }

  busqueda() {
    if (this.valorInput === "") {
      this.http
        .get("http://localhost:3000/api/v1/eventos/")
        .subscribe((data) => {
          this.myData = data;
          this.myData = this.myData.eventos;
        });
    } else {
      this.http
        .get("http://localhost:3000/api/v1/eventos/busqueda/" + this.valorInput)
        .subscribe((data) => {
          this.myData = data;
          this.myData = this.myData.evento;
        });
    }
  }

  openModal(
    id: string,
    price: number,
    name: string,
    date: string,
    tickets: number
  ): void {
    if (localStorage.getItem("session") === null) {
      this._snackBar.open(
        "Inicia sesion para poder gestionar tus entradas.",
        "",
        { duration: 3000 }
      );
      return;
    }
    const userData = JSON.parse(localStorage.getItem("session") ?? "");
    const entradas = this.dialog.open(EventModalComponent, {
      data: { id, price, name, date, tickets, userName: atob(userData.name) },
      panelClass: "modal-class",
      width: "720px",
      disableClose: true,
    });
  }
}

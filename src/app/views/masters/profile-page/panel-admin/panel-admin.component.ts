import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreateEventComponent } from "./create-event/create-event.component";
import { EditDeleteEventComponent } from "./edit-delete-event/edit-delete-event.component";

@Component({
  selector: "app-panel-admin",
  templateUrl: "./panel-admin.component.html",
  styleUrls: ["./panel-admin.component.scss"],
})
export class PanelAdminComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  createEvent() {
    const createEvent = this.dialog.open(CreateEventComponent, {
      panelClass: "modal-class",
      width: "720px",
      disableClose: true,
    });
  }

  editEvent() {
    const editEvent = this.dialog.open(EditDeleteEventComponent, {
      panelClass: "modal-class",
      width: "720px",
      disableClose: true,
      maxHeight: "80vh"
    });
  }
}

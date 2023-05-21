import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteEventComponent } from './edit-delete-event.component';

describe('EditDeleteEventComponent', () => {
  let component: EditDeleteEventComponent;
  let fixture: ComponentFixture<EditDeleteEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

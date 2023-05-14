import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMasterComponent } from './footer-master.component';

describe('FooterMasterComponent', () => {
  let component: FooterMasterComponent;
  let fixture: ComponentFixture<FooterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

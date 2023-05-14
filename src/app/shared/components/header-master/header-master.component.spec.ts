import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMasterComponent } from './header-master.component';

describe('HeaderMasterComponent', () => {
  let component: HeaderMasterComponent;
  let fixture: ComponentFixture<HeaderMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

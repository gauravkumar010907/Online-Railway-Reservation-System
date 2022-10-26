import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouravComponent } from './sourav.component';

describe('SouravComponent', () => {
  let component: SouravComponent;
  let fixture: ComponentFixture<SouravComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouravComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouravComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

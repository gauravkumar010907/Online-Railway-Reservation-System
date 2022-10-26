import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetrainComponent } from './managetrain.component';

describe('ManagetrainComponent', () => {
  let component: ManagetrainComponent;
  let fixture: ComponentFixture<ManagetrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagetrainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagetrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

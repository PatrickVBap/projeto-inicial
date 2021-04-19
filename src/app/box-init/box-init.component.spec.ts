import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInitComponent } from './box-init.component';

describe('BoxInitComponent', () => {
  let component: BoxInitComponent;
  let fixture: ComponentFixture<BoxInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

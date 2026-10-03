import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralButtonPageComponent } from './general-button-page.component';

describe('GeneralButtonPageComponent', () => {
  let component: GeneralButtonPageComponent;
  let fixture: ComponentFixture<GeneralButtonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralButtonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralButtonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

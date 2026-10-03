import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotPageComponent } from './kot-page.component';

describe('KotPageComponent', () => {
  let component: KotPageComponent;
  let fixture: ComponentFixture<KotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

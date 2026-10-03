import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsPageComponent } from './weapons-page.component';

describe('WeaponsPageComponent', () => {
  let component: WeaponsPageComponent;
  let fixture: ComponentFixture<WeaponsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

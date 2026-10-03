import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldsPageComponent } from './worlds-page.component';

describe('WorldsPageComponent', () => {
  let component: WorldsPageComponent;
  let fixture: ComponentFixture<WorldsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

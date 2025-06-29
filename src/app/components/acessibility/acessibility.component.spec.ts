import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessibilityComponent } from './acessibility.component';

describe('AcessibilityComponent', () => {
  let component: AcessibilityComponent;
  let fixture: ComponentFixture<AcessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

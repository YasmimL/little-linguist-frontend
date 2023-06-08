import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryGameCardComponent } from './memory-game-card.component';

describe('MemoryGameCardComponent', () => {
  let component: MemoryGameCardComponent;
  let fixture: ComponentFixture<MemoryGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryGameCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

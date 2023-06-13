import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityExerciseComponent } from './activity-exercise.component';

describe('ActivityExerciseComponent', () => {
  let component: ActivityExerciseComponent;
  let fixture: ComponentFixture<ActivityExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

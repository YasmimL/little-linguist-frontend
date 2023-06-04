import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivityStudyComponent } from './activity-study.component';

describe('ActivityStudyComponent', () => {
  let component: ActivityStudyComponent;
  let fixture: ComponentFixture<ActivityStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ActivityStudyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

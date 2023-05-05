import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCategoryComponent } from './activity-category.component';

describe('ActivityCategoryComponent', () => {
  let component: ActivityCategoryComponent;
  let fixture: ComponentFixture<ActivityCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

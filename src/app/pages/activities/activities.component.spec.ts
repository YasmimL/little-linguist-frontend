import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { Router } from '@angular/router';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitiesComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the selectActivity method', fakeAsync(() => {
    const button = fixture.debugElement.nativeElement.querySelector('.card');
    tick(200);

    button.click();
    expect(component.current).toBe(0);

    flush();
  }));

  it('should navigate to the correct category', () => {
    component.selectCategory('animals', 1);
    expect(router.navigate).toHaveBeenCalledWith(['/activities/animals/study']);
  });
});

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivityCategoryComponent } from './activity-category.component';

describe('ActivityCategoryComponent', () => {
  let component: ActivityCategoryComponent;
  let fixture: ComponentFixture<ActivityCategoryComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    const activitiesDataServiceSpy = jasmine.createSpyObj(
      'ActivitiesDataService',
      ['getActivities'],
      {
        activities: [
          {
            key: 'animals',
            src: 'assets/images/animals.png',
            portugueseName: 'Animais',
            englishName: 'Animals',
            width: '12rem',
            words: [
              {
                key: 'cat',
                src: 'assets/images/cat.png',
                portugueseName: 'Gato',
                englishName: 'Cat',
                width: '5.326rem',
              },
              {
                key: 'dog',
                src: 'assets/images/dog.png',
                portugueseName: 'Cachorro',
                englishName: 'Dog',
                width: '6rem',
              },
            ],
          },
        ],
      }
    );

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ActivityCategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => 'animals' }) },
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ActivityCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the route key and set the activity', fakeAsync(() => {
    component.getRouteKey();
    tick();
    expect(component.activity?.key).toEqual('animals');
  }));

  it('should navigate to the correct category', () => {
    component.selectCategory('animals', 1);
    expect(router.navigate).toHaveBeenCalledWith([
      '/activities/categories/animals/study',
    ]);
  });
});

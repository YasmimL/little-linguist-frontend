import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivitiesDataService } from 'src/app/services/activities.data.service';

@Component({
  selector: 'app-activity-category',
  templateUrl: './activity-category.component.html',
  styleUrls: ['./activity-category.component.scss'],
})
export class ActivityCategoryComponent implements OnInit {
  activities = this.activitiesDataService.activities;
  activity?: Activity;
  categories = [
    {
      englishName: 'Exercise',
      portugueseName: 'Exercitar',
      src: 'assets/images/exercise.png',
      width: '10rem',
    },
    {
      englishName: 'Study',
      portugueseName: 'Estudar',
      src: 'assets/images/study.png',
      width: '9rem',
    },
  ];

  constructor(
    private activitiesDataService: ActivitiesDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRouteKey();
  }

  getRouteKey(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const keyActivity = params.get('key');

      const [activity] = this.activities.filter(
        (activity) => activity.key === keyActivity
      );
      this.activity = activity;
    });
  }

  selectCategory(key: string, index: number): void {
    if (index === 1) {
      this.router.navigate([`/activities/categories/${key}/study`]);
    }
  }
}

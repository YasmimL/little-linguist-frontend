import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivitiesDataService } from 'src/app/services/activities.data.service';
import { ScreenReaderAnnouncerService } from 'src/app/services/screen-reader-announcer.service';
import { focusElement } from 'src/app/utils/focus-element';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  activities = this.activitiesDataService.activities;
  current: number = -1;
  activity?: Activity;
  categories = [
    {
      englishName: 'Exercise',
      portugueseName: 'Exercitar',
      src: 'assets/images/exercise.png',
      width: '10rem',
      key: 'exercise',
    },
    {
      englishName: 'Study',
      portugueseName: 'Estudar',
      src: 'assets/images/study.png',
      width: '9rem',
      key: 'study',
    },
  ];

  constructor(
    private activitiesDataService: ActivitiesDataService,
    private router: Router,
    private screenReaderAnnouncerService: ScreenReaderAnnouncerService
  ) {}

  ngOnInit(): void {
    focusElement(() =>
      document.querySelector('.activities-container > .breadcrumb')
    );
  }

  selectActivity(activity: Activity, index: number): void {
    this.current = index;
    this.activity = activity;

    setTimeout(() => {
      const selectedActivity = document.querySelector(
        '.activities-category-container'
      );

      if (selectedActivity) {
        const scrollIntoSelectedActivity = () =>
          selectedActivity.scrollIntoView({ behavior: 'smooth' });
        const breadcrumbSelector = () =>
          selectedActivity.querySelector('.breadcrumb');

        setTimeout(scrollIntoSelectedActivity, 200);
        setTimeout(() => focusElement(breadcrumbSelector), 500);
      }
    });
  }

  selectCategory(key: string, index: number): void {
    if (index === 1) {
      this.router.navigate([`/activities/${key}/study`]);
    } else if (index === 0) {
      this.router.navigate([`/activities/${key}/exercise`]);
    }
  }
}

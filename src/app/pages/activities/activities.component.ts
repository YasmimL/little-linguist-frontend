import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivitiesDataService } from 'src/app/services/activities.data.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  activities = this.activitiesDataService.activities;

  constructor(
    private activitiesDataService: ActivitiesDataService,
    private router: Router
  ) {}

  selectActivity(key: string): void {
    this.router.navigate(['/activities/categories/', key]);
  }
}

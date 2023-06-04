import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivitiesDataService } from 'src/app/services/activities.data.service';

@Component({
  selector: 'app-activity-study',
  templateUrl: './activity-study.component.html',
  styleUrls: ['./activity-study.component.scss'],
})
export class ActivityStudyComponent implements OnInit {
  activity?: Activity;

  constructor(
    private activitiesDataService: ActivitiesDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRouteKey();
  }

  getRouteKey(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const keyActivity = params.get('key');

      this.activity = this.activitiesDataService.activities.find(
        (activity) => activity.key === keyActivity
      );
    });
  }
}

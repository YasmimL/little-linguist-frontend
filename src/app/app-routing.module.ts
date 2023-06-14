import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityStudyComponent } from './pages/activity-study/activity-study.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { ActivityExerciseComponent } from './pages/activity-exercise/activity-exercise.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  {
    path: 'activities',
    component: ActivitiesComponent,
  },
  {
    path: 'activities/:key/study',
    component: ActivityStudyComponent,
  },
  {
    path: 'activities/:key/exercise',
    component: ActivityExerciseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

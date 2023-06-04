import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { ActivityCategoryComponent } from './pages/activity-category/activity-category.component';
import { ActivityStudyComponent } from './pages/activity-study/activity-study.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  {
    path: 'activities',
    component: ActivitiesComponent,
  },
  { path: 'activities/categories/:key', component: ActivityCategoryComponent },
  {
    path: 'activities/categories/:key/study',
    component: ActivityStudyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

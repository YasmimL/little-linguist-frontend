import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityCategoryComponent } from './pages/activity-category/activity-category.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { ActivityStudyComponent } from './pages/activity-study/activity-study.component';
import { MemoryGameComponent } from './components/memory-game/memory-game.component';
import { MemoryGameCardComponent } from './components/memory-game-card/memory-game-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    ActivitiesComponent,
    ActivityCategoryComponent,
    NavbarComponent,
    CarouselComponent,
    ActivityStudyComponent,
    MemoryGameComponent,
    MemoryGameCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

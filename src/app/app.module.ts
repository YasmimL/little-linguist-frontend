import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MemoryGameCardComponent } from './components/memory-game-card/memory-game-card.component';
import { MemoryGameComponent } from './components/memory-game/memory-game.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityStudyComponent } from './pages/activity-study/activity-study.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    ActivitiesComponent,
    NavbarComponent,
    CarouselComponent,
    ActivityStudyComponent,
    MemoryGameComponent,
    MemoryGameCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

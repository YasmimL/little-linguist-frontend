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
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RankingComponent } from './components/ranking/ranking.component';

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
    ModalLoginComponent,
    RankingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}

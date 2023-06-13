import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MemoryGameCardComponent } from './components/memory-game-card/memory-game-card.component';
import { MemoryGameComponent } from './components/memory-game/memory-game.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityStudyComponent } from './pages/activity-study/activity-study.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfettiComponent } from './components/confetti/confetti.component';
import { ActivityExerciseComponent } from './pages/activity-exercise/activity-exercise.component';

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
    ConfettiComponent,
    ActivityExerciseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-center',
      progressBar: true,
    }),
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}

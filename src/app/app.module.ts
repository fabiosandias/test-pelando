import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { DividerComponent } from './components/divider/divider.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    AddVideoComponent,
    DividerComponent,
    VideoCardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

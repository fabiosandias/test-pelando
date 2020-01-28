import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { YoutubeService } from './services/youtube.service'
import { LocalstorageService } from './services/localstorage.service'

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
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    AddVideoComponent,
    DividerComponent,
    VideoCardComponent,
    HomeComponent,
    SearchResultComponent,
    ModalComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [
    YoutubeService,
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

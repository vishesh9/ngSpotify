import { AlbumsComponent } from './Components/albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { AboutComponent } from './Components/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewReleasesComponent } from './Components/new-releases/new-releases.component';
import { ArtistDetailsComponent } from './Components/artist-details/artist-details.component';
import { MusicplayerComponent } from './Components/musicplayer/musicplayer.component';
import { LoginComponent } from './Components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomepageComponent,
    AboutComponent,
    NewReleasesComponent,
    ArtistDetailsComponent,
    MusicplayerComponent,
    AlbumsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

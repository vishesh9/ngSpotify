import { LoginComponent } from './Components/login/login.component';
import { AlbumsComponent } from './Components/albums/albums.component';
import { ArtistDetailsComponent } from './Components/artist-details/artist-details.component';
import { NewReleasesComponent } from './Components/new-releases/new-releases.component';
import { AboutComponent } from './Components/about/about.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'newReleases', component: NewReleasesComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'artist/:id', component: ArtistDetailsComponent
  },
  {
    path: 'albums/:id',  component: AlbumsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [''];

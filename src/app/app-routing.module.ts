import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JoinTournamentComponent } from './Tournaments/join-tournament/join-tournament.component';
import { CreateTournamentComponent } from './Tournaments/create-tournament/create-tournament.component';
import { StatshomeComponent } from './Statistics/statshome/statshome.component';
import { StatsplayerComponent } from './Statistics/statsplayer/statsplayer.component';
import { StatssiteComponent } from './Statistics/statssite/statssite.component';
import { AboutComponent } from './about/about.component';
import { TermsOfServiceComponent } from './Details/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './Details/privacy-policy/privacy-policy.component';
import { ContactComponent } from './Details/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'join', component: JoinTournamentComponent},
  { path: 'create', component: CreateTournamentComponent},
  { path: 'stats', component: StatshomeComponent},
  { path: 'stats/player', component: StatsplayerComponent},
  { path: 'website', component: StatssiteComponent},
  { path: 'about', component: AboutComponent},
  { path: 'TermsofService', component: TermsOfServiceComponent},
  { path: 'PrivacyPolicy', component: PrivacyPolicyComponent},
  { path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { JoinTournamentComponent } from './Tournaments/join-tournament/join-tournament.component';
import { CreateTournamentComponent } from './Tournaments/create-tournament/create-tournament.component';
import { StatshomeComponent } from './Statistics/statshome/statshome.component';
import { StatsplayerComponent } from './Statistics/statsplayer/statsplayer.component';
import { StatssiteComponent } from './Statistics/statssite/statssite.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './Details/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './Details/terms-of-service/terms-of-service.component';
import { ContactComponent } from './Details/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinTournamentComponent,
    CreateTournamentComponent,
    StatshomeComponent,
    StatsplayerComponent,
    StatssiteComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    ContactComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

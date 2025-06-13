import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { JoinTournamentComponent } from './Tournaments/join-tournament/join-tournament.component';
import { CreateTournamentComponent } from './Tournaments/create-tournament/create-tournament.component';
import { ManageTournamentComponent } from './Tournaments/manage-tournament/manage-tournament.component';
import { StatshomeComponent } from './Statistics/statshome/statshome.component';
import { StatsplayerComponent } from './Statistics/statsplayer/statsplayer.component';
import { StatssiteComponent } from './Statistics/statssite/statssite.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './Details/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './Details/terms-of-service/terms-of-service.component';
import { ContactComponent } from './Details/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProfileComponent } from './profile/profile.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinTournamentComponent,
    CreateTournamentComponent,
    ManageTournamentComponent,
    StatshomeComponent,
    StatsplayerComponent,
    StatssiteComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    ContactComponent,
    SpinnerComponent,
    ProfileComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    CommonModule,
    DragDropModule, // <-- Added for Angular CDK drag-and-drop
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

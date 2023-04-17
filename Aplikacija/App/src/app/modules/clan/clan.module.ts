import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanMainPageComponent } from './clan-main-page/clan-main-page.component';
import { ClanTreneriComponent } from './clan-treneri/clan-treneri.component';
import { ClanVezbeComponent } from './clan-vezbe/clan-vezbe.component';
import { ClanIshranaComponent } from './clan-ishrana/clan-ishrana.component';
import { ClanTreningComponent } from './clan-trening/clan-trening.component';
import { ClanPodesavanjaComponent } from './clan-podesavanja/clan-podesavanja.component';
import { ClanProblemComponent } from './clan-problem/clan-problem.component';
import { ClanVezbeTricepsComponent } from './clan-vezbe/clan-vezbe-triceps/clan-vezbe-triceps.component';
import { ClanVezbeBicepsComponent } from './clan-vezbe/clan-vezbe-biceps/clan-vezbe-biceps.component';
import { ClanVezbeBackComponent } from './clan-vezbe/clan-vezbe-back/clan-vezbe-back.component';
import { ClanVezbeShouldersComponent } from './clan-vezbe/clan-vezbe-shoulders/clan-vezbe-shoulders.component';
import { ClanVezbeQuadsComponent } from './clan-vezbe/clan-vezbe-quads/clan-vezbe-quads.component';
import { ClanVezbeHamstringsComponent } from './clan-vezbe/clan-vezbe-hamstrings/clan-vezbe-hamstrings.component';
import { ClanVezbeCalvesComponent } from './clan-vezbe/clan-vezbe-calves/clan-vezbe-calves.component';
import { ClanVezbeGlutesComponent } from './clan-vezbe/clan-vezbe-glutes/clan-vezbe-glutes.component';
import { ClanVezbePecksComponent } from './clan-vezbe/clan-vezbe-pecks/clan-vezbe-pecks.component';
import { ClanVezbeObliquesComponent } from './clan-vezbe/clan-vezbe-obliques/clan-vezbe-obliques.component';
import { VezbeModule } from '../vezbe/vezbe.module';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';
import { BackToTopModule } from 'src/app/shared/modules/back-to-top/back-to-top.module';
import { ClanRadioComponent } from './clan-radio/clan-radio.component';
import { RadioModule } from 'src/app/shared/modules/radio/radio.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ClanLandingPageComponent } from './clan-landing-page/clan-landing-page.component';
import { ModalModule } from 'src/app/shared/_modal';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { LogoutModule } from 'src/app/shared/modules/logout/logout.module';
import { SafePipeModule } from 'src/app/shared/modules/safe-pipe/safe-pipe.module';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ClanZakaziTreningComponent } from './clan-zakazi-trening/clan-zakazi-trening.component';
import { NgxPaymentCardModule } from 'ngx-payment-card';

@NgModule({
  declarations: [
    ClanMainPageComponent,
    ClanTreneriComponent,
    ClanVezbeComponent,
    ClanIshranaComponent,
    ClanTreningComponent,
    ClanPodesavanjaComponent,
    ClanProblemComponent,
    ClanVezbeTricepsComponent,
    ClanVezbeBicepsComponent,
    ClanVezbeBackComponent,
    ClanVezbeShouldersComponent,
    ClanVezbeQuadsComponent,
    ClanVezbeHamstringsComponent,
    ClanVezbeCalvesComponent,
    ClanVezbeGlutesComponent,
    ClanVezbePecksComponent,
    ClanVezbeObliquesComponent,
    ClanRadioComponent,
    ClanLandingPageComponent,
    ClanZakaziTreningComponent
  ],
  imports: [
    CommonModule,
    VezbeModule,
    FooterModule,
    BackToTopModule,
    RadioModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    ModalModule,
    NgbAlertModule,
    HttpClientModule,
    LogoutModule,
    SafePipeModule,
    FullCalendarModule,
    ReactiveFormsModule,
    NgxPaymentCardModule
  ],
  exports: [
    ClanMainPageComponent,
    ClanTreneriComponent,
    ClanVezbeComponent,
    ClanIshranaComponent,
    ClanTreningComponent,
    ClanPodesavanjaComponent,
    ClanProblemComponent,
    ClanVezbeTricepsComponent,
    ClanVezbeBicepsComponent,
    ClanVezbeBackComponent,
    ClanVezbeShouldersComponent,
    ClanVezbeQuadsComponent,
    ClanVezbeHamstringsComponent,
    ClanVezbeCalvesComponent,
    ClanVezbeGlutesComponent,
    ClanVezbePecksComponent,
    ClanVezbeObliquesComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    SafePipe
  ],
})
export class ClanModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrenerTreningComponent } from './trener-trening/trener-trening.component';
import { TrenerIshranaComponent } from './trener-ishrana/trener-ishrana.component';
import { TrenerPodesavanjaComponent } from './trener-podesavanja/trener-podesavanja.component';
import { TrenerProblemComponent } from './trener-problem/trener-problem.component';
import { TrenerMainPageComponent } from './trener-main-page/trener-main-page.component';
import { TrenerKlijentiComponent } from './trener-klijenti/trener-klijenti.component';
import { TrenerVezbeBackComponent } from './trener-vezbe/trener-vezbe-back/trener-vezbe-back.component';
import { TrenerVezbeBicepsComponent } from './trener-vezbe/trener-vezbe-biceps/trener-vezbe-biceps.component';
import { TrenerVezbeCalvesComponent } from './trener-vezbe/trener-vezbe-calves/trener-vezbe-calves.component';
import { TrenerVezbeGlutesComponent } from './trener-vezbe/trener-vezbe-glutes/trener-vezbe-glutes.component';
import { TrenerVezbeHamstringsComponent } from './trener-vezbe/trener-vezbe-hamstrings/trener-vezbe-hamstrings.component';
import { TrenerVezbeObliquesComponent } from './trener-vezbe/trener-vezbe-obliques/trener-vezbe-obliques.component';
import { TrenerVezbePecksComponent } from './trener-vezbe/trener-vezbe-pecks/trener-vezbe-pecks.component';
import { TrenerVezbeQuadsComponent } from './trener-vezbe/trener-vezbe-quads/trener-vezbe-quads.component';
import { TrenerVezbeShouldersComponent } from './trener-vezbe/trener-vezbe-shoulders/trener-vezbe-shoulders.component';
import { TrenerVezbeTricepsComponent } from './trener-vezbe/trener-vezbe-triceps/trener-vezbe-triceps.component';
import { VezbeModule } from '../vezbe/vezbe.module';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';
import { TrenerVezbeComponent } from './trener-vezbe/trener-vezbe.component';
import { TrenerRadioComponent } from './trener-radio/trener-radio.component';
import { RadioModule } from 'src/app/shared/modules/radio/radio.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'src/app/shared/_modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { LogoutModule } from 'src/app/shared/modules/logout/logout.module';
import { SafePipeModule } from 'src/app/shared/modules/safe-pipe/safe-pipe.module';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    TrenerTreningComponent,
    TrenerIshranaComponent,
    TrenerPodesavanjaComponent,
    TrenerProblemComponent,
    TrenerMainPageComponent,
    TrenerKlijentiComponent,
    TrenerVezbeBackComponent,
    TrenerVezbeBicepsComponent,
    TrenerVezbeCalvesComponent,
    TrenerVezbeGlutesComponent,
    TrenerVezbeHamstringsComponent,
    TrenerVezbeObliquesComponent,
    TrenerVezbePecksComponent,
    TrenerVezbeQuadsComponent,
    TrenerVezbeShouldersComponent,
    TrenerVezbeTricepsComponent,
    TrenerVezbeComponent,
    TrenerRadioComponent,
  ],
  imports: [
    CommonModule,
    VezbeModule,
    FooterModule,
    RadioModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    FullCalendarModule,
    ModalModule,
    DragDropModule,
    MatTabsModule,
    HttpClientModule,
    LogoutModule,
    SafePipeModule
  ],
  exports: [
    TrenerTreningComponent,
    TrenerIshranaComponent,
    TrenerPodesavanjaComponent,
    TrenerProblemComponent,
    TrenerMainPageComponent,
    TrenerKlijentiComponent,
    TrenerVezbeBackComponent,
    TrenerVezbeBicepsComponent,
    TrenerVezbeCalvesComponent,
    TrenerVezbeGlutesComponent,
    TrenerVezbeHamstringsComponent,
    TrenerVezbeObliquesComponent,
    TrenerVezbePecksComponent,
    TrenerVezbeQuadsComponent,
    TrenerVezbeShouldersComponent,
    TrenerVezbeTricepsComponent,
    TrenerVezbeComponent
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
export class TrenerModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AdminClanoviComponent } from './modules/admin/admin-clanovi/admin-clanovi.component';
import { AdminGrupeComponent } from './modules/admin/admin-grupe/admin-grupe.component';
import { AdminIshranaComponent } from './modules/admin/admin-ishrana/admin-ishrana.component';
import { AdminTreneriComponent } from './modules/admin/admin-treneri/admin-treneri.component';
import { AdminTreningComponent } from './modules/admin/admin-trening/admin-trening.component';
import { AdminVezbeComponent } from './modules/admin/admin-vezbe/admin-vezbe.component';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { ClanIshranaComponent } from './modules/clan/clan-ishrana/clan-ishrana.component';
import { ClanLandingPageComponent } from './modules/clan/clan-landing-page/clan-landing-page.component';
import { ClanMainPageComponent } from './modules/clan/clan-main-page/clan-main-page.component';
import { ClanPodesavanjaComponent } from './modules/clan/clan-podesavanja/clan-podesavanja.component';
import { ClanProblemComponent } from './modules/clan/clan-problem/clan-problem.component';
import { ClanRadioComponent } from './modules/clan/clan-radio/clan-radio.component';
import { ClanTreneriComponent } from './modules/clan/clan-treneri/clan-treneri.component';
import { ClanTreningComponent } from './modules/clan/clan-trening/clan-trening.component';
import { ClanVezbeBackComponent } from './modules/clan/clan-vezbe/clan-vezbe-back/clan-vezbe-back.component';
import { ClanVezbeBicepsComponent } from './modules/clan/clan-vezbe/clan-vezbe-biceps/clan-vezbe-biceps.component';
import { ClanVezbeCalvesComponent } from './modules/clan/clan-vezbe/clan-vezbe-calves/clan-vezbe-calves.component';
import { ClanVezbeGlutesComponent } from './modules/clan/clan-vezbe/clan-vezbe-glutes/clan-vezbe-glutes.component';
import { ClanVezbeHamstringsComponent } from './modules/clan/clan-vezbe/clan-vezbe-hamstrings/clan-vezbe-hamstrings.component';
import { ClanVezbeObliquesComponent } from './modules/clan/clan-vezbe/clan-vezbe-obliques/clan-vezbe-obliques.component';
import { ClanVezbePecksComponent } from './modules/clan/clan-vezbe/clan-vezbe-pecks/clan-vezbe-pecks.component';
import { ClanVezbeQuadsComponent } from './modules/clan/clan-vezbe/clan-vezbe-quads/clan-vezbe-quads.component';
import { ClanVezbeShouldersComponent } from './modules/clan/clan-vezbe/clan-vezbe-shoulders/clan-vezbe-shoulders.component';
import { ClanVezbeTricepsComponent } from './modules/clan/clan-vezbe/clan-vezbe-triceps/clan-vezbe-triceps.component';
import { ClanVezbeComponent } from './modules/clan/clan-vezbe/clan-vezbe.component';
import { ClanZakaziTreningComponent } from './modules/clan/clan-zakazi-trening/clan-zakazi-trening.component';
import { PlatiClanarinuComponent } from './modules/pocetna/plati-clanarinu/plati-clanarinu.component';
import { ResetPasswordComponent } from './modules/pocetna/reset-password/reset-password.component';
import { WelcomePageComponent } from './modules/pocetna/welcome-page/welcome-page.component';
import { TrenerIshranaComponent } from './modules/trener/trener-ishrana/trener-ishrana.component';
import { TrenerKlijentiComponent } from './modules/trener/trener-klijenti/trener-klijenti.component';
import { TrenerMainPageComponent } from './modules/trener/trener-main-page/trener-main-page.component';
import { TrenerPodesavanjaComponent } from './modules/trener/trener-podesavanja/trener-podesavanja.component';
import { TrenerProblemComponent } from './modules/trener/trener-problem/trener-problem.component';
import { TrenerRadioComponent } from './modules/trener/trener-radio/trener-radio.component';
import { TrenerTreningComponent } from './modules/trener/trener-trening/trener-trening.component';
import { TrenerVezbeBackComponent } from './modules/trener/trener-vezbe/trener-vezbe-back/trener-vezbe-back.component';
import { TrenerVezbeBicepsComponent } from './modules/trener/trener-vezbe/trener-vezbe-biceps/trener-vezbe-biceps.component';
import { TrenerVezbeCalvesComponent } from './modules/trener/trener-vezbe/trener-vezbe-calves/trener-vezbe-calves.component';
import { TrenerVezbeGlutesComponent } from './modules/trener/trener-vezbe/trener-vezbe-glutes/trener-vezbe-glutes.component';
import { TrenerVezbeHamstringsComponent } from './modules/trener/trener-vezbe/trener-vezbe-hamstrings/trener-vezbe-hamstrings.component';
import { TrenerVezbeObliquesComponent } from './modules/trener/trener-vezbe/trener-vezbe-obliques/trener-vezbe-obliques.component';
import { TrenerVezbePecksComponent } from './modules/trener/trener-vezbe/trener-vezbe-pecks/trener-vezbe-pecks.component';
import { TrenerVezbeQuadsComponent } from './modules/trener/trener-vezbe/trener-vezbe-quads/trener-vezbe-quads.component';
import { TrenerVezbeShouldersComponent } from './modules/trener/trener-vezbe/trener-vezbe-shoulders/trener-vezbe-shoulders.component';
import { TrenerVezbeTricepsComponent } from './modules/trener/trener-vezbe/trener-vezbe-triceps/trener-vezbe-triceps.component';
import { TrenerVezbeComponent } from './modules/trener/trener-vezbe/trener-vezbe.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'resetpass',
    component: ResetPasswordComponent
  },
  {
    path: 'plati',
    component : PlatiClanarinuComponent
  },
  {
    path: 'clan',
    children: [
      {
        path: '',
        component: ClanMainPageComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path:'land',
        component:ClanLandingPageComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path:'zakazi',
        component:ClanZakaziTreningComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path: 'treneri',
        component: ClanTreneriComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path: 'vezbe',
        children: [
          {
            path: '',
            component: ClanVezbeComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'obliques',
            component: ClanVezbeObliquesComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'pecks',
            component: ClanVezbePecksComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'glutes',
            component: ClanVezbeGlutesComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'hamstrings',
            component: ClanVezbeHamstringsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'quads',
            component: ClanVezbeQuadsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'biceps',
            component: ClanVezbeBicepsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'triceps',
            component: ClanVezbeTricepsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'shoulders',
            component: ClanVezbeShouldersComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'calves',
            component: ClanVezbeCalvesComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
          {
            path: 'back',
            component: ClanVezbeBackComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"C"
            }
          },
        ],
      },
      {
        path: 'planovi/trening',
        component: ClanTreningComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path: 'planovi/ishrana',
        component: ClanIshranaComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path: 'podesavanja',
        component: ClanPodesavanjaComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
      {
        path: 'prijavi-problem',
        component: ClanProblemComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },

      {
        path: 'radio',
        component: ClanRadioComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"C"
        }
      },
    ],
  },
  {
    path: 'trener',
    children: [
      {
        path: '',
        component: TrenerMainPageComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
      {
        path: 'klijenti',
        component: TrenerKlijentiComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
      {
        path: 'vezbe',
        children: [
          {
            path: '',
            component: TrenerVezbeComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'obliques',
            component: TrenerVezbeObliquesComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'pecks',
            component: TrenerVezbePecksComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'glutes',
            component: TrenerVezbeGlutesComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'hamstrings',
            component: TrenerVezbeHamstringsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'quads',
            component: TrenerVezbeQuadsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'biceps',
            component: TrenerVezbeBicepsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'triceps',
            component: TrenerVezbeTricepsComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'shoulders',
            component: TrenerVezbeShouldersComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'calves',
            component: TrenerVezbeCalvesComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
          {
            path: 'back',
            component: TrenerVezbeBackComponent,
            canActivate: [AuthGuardService],
            data:{
              role:"T"
            }
          },
        ],
      },
      {
        path: 'planovi/ishrana',
        component: TrenerIshranaComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
      {
        path: 'planovi/trening',
        component: TrenerTreningComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
      {
        path: 'podesavanja',
        component: TrenerPodesavanjaComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
      {
        path: 'prijavi-problem',
        component: TrenerProblemComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
      {
        path: 'radio',
        component: TrenerRadioComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"T"
        }
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      },
      {
        path: 'clanovi',
        component: AdminClanoviComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      },
      {
        path: 'treneri',
        component: AdminTreneriComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      },
      {
        path: 'vezbe',
        component: AdminVezbeComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      },
      {
        path: 'ishrana',
        component: AdminIshranaComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      },
      {
        path: 'trening',
        component: AdminTreningComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      },
      {
        path: 'grupe',
        component:AdminGrupeComponent,
        canActivate: [AuthGuardService],
        data:{
          role:"A"
        }
      }
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

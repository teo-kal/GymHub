import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { ClanModule } from './modules/clan/clan.module';
import { TrenerModule } from './modules/trener/trener.module';
import { VezbeModule } from './modules/vezbe/vezbe.module';
import { PocetnaModule } from './modules/pocetna/pocetna.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { BackToTopModule } from './shared/modules/back-to-top/back-to-top.module';
import { RadioModule } from './shared/modules/radio/radio.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalModule } from './shared/_modal';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SafePipeModule } from './shared/modules/safe-pipe/safe-pipe.module';
import { NgxPaymentCardModule } from 'ngx-payment-card';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    FooterModule,
    BackToTopModule,
    AdminModule,
    ClanModule,
    TrenerModule,
    VezbeModule,
    PocetnaModule,
    RadioModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ModalModule,
    FooterModule,
    ToastrModule.forRoot(),
    SafePipeModule,
    NgxPaymentCardModule
  ],
  providers: [
    {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

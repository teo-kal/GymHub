import { NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';
import { BackToTopModule } from 'src/app/shared/modules/back-to-top/back-to-top.module';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalModule } from 'src/app/shared/_modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PlatiClanarinuComponent } from './plati-clanarinu/plati-clanarinu.component';
import { NgxPaymentCardModule } from 'ngx-payment-card';

@NgModule({
  declarations: [
    WelcomePageComponent,
    ResetPasswordComponent,
    PlatiClanarinuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FooterModule,
    FormsModule,
    BackToTopModule,
    NgbAlertModule,
    MatInputModule,
    MatDatepickerModule,
    ModalModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxPaymentCardModule
  ],
  exports:[
    WelcomePageComponent
  ]
})
export class PocetnaModule { }

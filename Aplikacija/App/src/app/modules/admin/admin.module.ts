import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminClanoviComponent } from './admin-clanovi/admin-clanovi.component';
import { AdminTreneriComponent } from './admin-treneri/admin-treneri.component';
import { AdminVezbeComponent } from './admin-vezbe/admin-vezbe.component';
import { AdminIshranaComponent } from './admin-ishrana/admin-ishrana.component';
import { AdminTreningComponent } from './admin-trening/admin-trening.component';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';
import { ModalModule } from 'src/app/shared/_modal';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AdminGrupeComponent } from './admin-grupe/admin-grupe.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { LogoutModule } from 'src/app/shared/modules/logout/logout.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminClanoviComponent,
    AdminTreneriComponent,
    AdminVezbeComponent,
    AdminIshranaComponent,
    AdminTreningComponent,
    AdminGrupeComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    ModalModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    NgbAlertModule,
    NgbModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    LogoutModule
  ],
  exports: [
    AdminComponent,
    AdminClanoviComponent,
    AdminTreneriComponent,
    AdminVezbeComponent,
    AdminIshranaComponent,
    AdminTreneriComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class AdminModule {}

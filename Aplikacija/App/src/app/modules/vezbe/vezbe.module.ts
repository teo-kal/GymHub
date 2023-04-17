import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VezbeMainComponent } from './vezbe-main/vezbe-main.component';
import { VezbeMainTrenerComponent } from './vezbe-main-trener/vezbe-main-trener.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    VezbeMainComponent,

    VezbeMainTrenerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    VezbeMainComponent,
    VezbeMainTrenerComponent
  ]
})
export class VezbeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToTopComponent } from './back-to-top/back-to-top.component';



@NgModule({
  declarations: [
    BackToTopComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BackToTopComponent
  ]
})
export class BackToTopModule { }

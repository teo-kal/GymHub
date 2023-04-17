import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subscription } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { AuthService } from 'src/app/services/auth.service';
import { GrupeService } from 'src/app/services/grupe.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-admin-grupe',
  templateUrl: './admin-grupe.component.html',
  styleUrls: ['./admin-grupe.component.css'],
})
export class AdminGrupeComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private grupeService: GrupeService
  ) {}

  grupe: Observable<Grupa[]> = of([]);
  ngOnInit(): void {
    this.grupe = this.grupeService.getAll();
  }
  clickObrisi = false;
  obrisi(grupa: Grupa) {
    if (this.clickObrisi) {
      this.grupeService.delete(grupa.ID).subscribe(
        () => {
          this.load();
          this.toastrService.success('Uspešno obrisana grupa', 'Success');
          this.clickObrisi = false;
        },
        () => {
          this.toastrService.error('Došlo je do greške', 'Error');
        }
      );
    }

    if(!this.clickObrisi){
      this.toastrService.info(
        'Kliknite opet na kanticu da biste potvrdili brisanje',
        'Info'
      );
      this.clickObrisi = true;
    }
  }
  load() {
    this.grupe = this.grupeService.getAll();
  }
}

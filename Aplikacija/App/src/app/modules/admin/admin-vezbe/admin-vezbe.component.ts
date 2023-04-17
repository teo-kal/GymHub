import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Vezba } from 'src/app/models/vezba';
import { VezbeService } from 'src/app/services/vezbe.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-admin-vezbe',
  templateUrl: './admin-vezbe.component.html',
  styleUrls: ['./admin-vezbe.component.css'],
})
export class AdminVezbeComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    private toastrService: ToastrService,
    private vezbaService: VezbeService
  ) {}

  vezbe: Observable<Vezba[]> = of([]);
  ngOnInit(): void {
    this.vezbe = this.vezbaService.getAll();
  }

  clickObrisi = false;
  obrisi(id: number) {
    if (this.clickObrisi) {
      this.vezbaService.delete(id).subscribe(
        () => {
          this.load();
          this.toastrService.success('Uspešno obrisana vežba', 'Success');
          this.clickObrisi = false;
        },
        () => this.toastrService.error('Došlo je do greške', 'Error')
      );
    }
    if (!this.clickObrisi) {
      this.toastrService.info(
        'Kliknite opet na kanticu da biste potvrdili brisanje',
        'Info'
      );
      this.clickObrisi = true;
    }
  }

  load() {
    this.vezbe = this.vezbaService.getAll();
  }
}

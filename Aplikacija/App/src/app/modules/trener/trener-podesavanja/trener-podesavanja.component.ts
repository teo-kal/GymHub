import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TrenerService } from 'src/app/services/trener.service';

@Component({
  selector: 'app-trener-podesavanja',
  templateUrl: './trener-podesavanja.component.html',
  styleUrls: ['./trener-podesavanja.component.css'],
})
export class TrenerPodesavanjaComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private trenerService: TrenerService
  ) {}

  trenerObv: Observable<any>;
  ngOnInit(): void {
    this.trenerObv = this.trenerService.getMePodesavanja(
      +localStorage.getItem('korisnikID')
    );
  }

  saveChanges(trener: any) {
    if (
      trener.trener.BrPersTreninga <= 5 &&
      trener.trener.BrPersTreninga >= 1
    ) {
      let obj = {
        ID: trener.korisnik.ID,
        Zvanje: trener.trener.Zvanje,
        BrPersTreninga: trener.trener.BrPersTreninga,
        BrRacuna: trener.osoba.BrRacuna,
      };
      console.log(obj);
      this.trenerService.setPodesavanja(obj).subscribe(
        () => {
          this.toastrService.success('Uspešno izmenjeni podaci', 'Success');
          setTimeout(() => {
            this.load();
          });
        },
        () => {
          this.toastrService.error('Došlo je do greške', 'Error');
        }
      );
    } else this.toastrService.error('Maksimalan broj treninga je 5', 'Error');
  }
  load() {
    this.trenerObv = this.trenerService.getMePodesavanja(
      +localStorage.getItem('korisnikID')
    );
  }

  promeniSliku() {

    const uploadData = new FormData();
    uploadData.append('avatar', this.selectedFile, this.selectedFile.name);

    this.trenerService.uploadSlika(+localStorage.getItem("korisnikID"), uploadData).subscribe(
      () => {
        console.log('succ');
        this.load();
      },
      () => {
        console.log('erro');
      }
    );
  }
  selectedFile:File;
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}

import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Clan } from 'src/app/models/clan';
import { TrenerService } from 'src/app/services/trener.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-trener-klijenti',
  templateUrl: './trener-klijenti.component.html',
  styleUrls: ['./trener-klijenti.component.css'],
})
export class TrenerKlijentiComponent implements OnInit, OnDestroy {
  constructor(
    private trenerService: TrenerService,
    private toastrService: ToastrService,
    public modalService: ModalService
  ) {}

  objekat: any;
  sub: Subscription;
  ngOnInit(): void {
    this.sub = this.trenerService
      .getMeKlijenti(+localStorage.getItem('korisnikID'))
      .subscribe((objekat) => (this.objekat = objekat));
    this.trenerService
      .getMePlanoviTreninga(+localStorage.getItem('korisnikID'))
      .subscribe((planovi) => {
        this.planoviTreninga = planovi;
      });
    this.trenerService
      .getMePlanoviIshrane(+localStorage.getItem('korisnikID'))
      .subscribe((planovi) => {
        this.planoviIshrane = planovi;
      });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  selectedKlijent: any | null;

  selectKlijent(osoba: any) {
    if (this.selectedKlijent == osoba) return;
    if (this.selectedKlijent == null) {
      this.selectedKlijent = osoba;
      console.log(this.selectedKlijent);
      document
        .getElementById(this.selectedKlijent.ID)
        .classList.add('selected');
    } else {
      console.log(this.selectedKlijent);
      console.log(osoba);
      document
        .getElementById(this.selectedKlijent.ID)
        .classList.remove('selected');
      this.selectedKlijent = osoba;
      document
        .getElementById(this.selectedKlijent.ID)
        .classList.add('selected');
    }
    this.toastrService.info(
      'Kliknite na dodaj u grupu ako želite da ga dodate u grupu',
      'Izabrali ste nekog klijenta'
    );
  }

  osobeGrupe: any = {};
  showGrupaDetalji(grupa: any) {
    this.trenerService.getMeOsobeGrupe(grupa.ID).subscribe((grupe) => {
      this.osobeGrupe = grupe;
      setTimeout(() => {
        this.modalService.open('modal-Grupa');
      });
    });
  }

  dodajUGrupu(GrupaID: number) {
    let ClanID = this.selectedKlijent.ID;
    let objZaSlanje = {
      GrupaID,
      ClanID,
    };
    this.trenerService.dodajClanaUGrupu(objZaSlanje).subscribe(
      () => {
        this.toastrService.success(
          'Uspešno ste dodali člana u grupu',
          'Succes'
        );
        this.selectedKlijent = null;
        setTimeout(() => {
          this.load();
        });
      },
      () => {
        this.toastrService.error('Došlo je do greške', 'Error');
      }
    );
  }

  izbaciIzGrupe(id:number){
    let ClanID=id;

    this.trenerService.izbaciClanaIzGrupe({ClanID}).subscribe(()=>{
      this.toastrService.success(
        'Uspešno ste izbacili člana iz grupe',
        'Succes'
      );
      this.modalService.close('modal-Grupa');
      setTimeout(()=>{
        this.load();
      })
    },()=>{
      this.toastrService.error('Došlo je do greške', 'Error');
    })
  }

  load() {
    this.sub = this.trenerService
      .getMeKlijenti(+localStorage.getItem('korisnikID'))
      .subscribe((objekat) => (this.objekat = objekat));
  }
  osobaZaDodeljivanje: any;
  dodeliPlanTreningaClanuClick(osoba: any) {
    this.modalService.open('modal-Trening');
    this.osobaZaDodeljivanje = osoba;
    this.grupaZaDodeljivanje = null;
    this.izabranPlanTreninga.pop();
  }

  dodeliPlanIshraneClanuClick(osoba: any) {
    this.modalService.open('modal-Ishrana');
    this.osobaZaDodeljivanje = osoba;
    this.grupaZaDodeljivanje = null;
    this.izabranPlanIshrane.pop();
  }

  grupaZaDodeljivanje: any;
  dodeliPlanIshraneGrupiClick(grupa: any) {
    this.modalService.open('modal-Ishrana');
    this.grupaZaDodeljivanje = grupa;
    this.osobaZaDodeljivanje = null;
    this.izabranPlanIshrane.pop();
  }

  dodeliPlanTreningaGrupiClick(grupa: any) {
    this.modalService.open('modal-Trening');
    this.grupaZaDodeljivanje = grupa;
    this.osobaZaDodeljivanje = null;
    this.izabranPlanTreninga.pop();
  }
  dodeliPlanIshrane(planID: number, clanID:number, grupaID:number) {
    this.trenerService.dodeliPlanIshrane({planID,clanID,grupaID}).subscribe(()=>{
      this.modalService.close('modal-Ishrana');
      this.toastrService.success("Usešno ste dodelii plan ishrane", "Success");
      setTimeout(()=>{
        this.load();
      })
    },()=>{
      this.toastrService.error('Došlo je do greške', 'Error');
    })
  }
  dodeliPlanTreninga(planID: number, clanID: number, grupaID: number) {
    this.trenerService.dodeliPlanTreninga({planID,clanID,grupaID}).subscribe(()=>{
      this.modalService.close('modal-Trening');
      this.toastrService.success("Usešno ste dodelii plan treninga", "Success");
      setTimeout(()=>{
        this.load();
      })
    },()=>{
      this.toastrService.error('Došlo je do greške', 'Error');
    })
  }
  izabranPlanTreninga = [];
  planoviTreninga: any;
  izabranPlanIshrane = [];
  planoviIshrane: any;

  drop(event: CdkDragDrop<string[]>) {
    if (event.container.data.length == 1) event.container.data.pop();
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(event.container.data);
  }

  remove(id: any, array: any) {
    let index = array.findIndex((el) => el.id === id);
    array.splice(index, 1);
    console.log(array);
  }
}

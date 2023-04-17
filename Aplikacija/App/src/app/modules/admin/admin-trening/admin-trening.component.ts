import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { PlanTreninga } from 'src/app/models/plan_treninga';
import { TreningService } from 'src/app/services/trening.service';

@Component({
  selector: 'app-admin-trening',
  templateUrl: './admin-trening.component.html',
  styleUrls: ['./admin-trening.component.css'],
})
export class AdminTreningComponent implements OnInit {
  constructor(
    private treningService: TreningService,
    private toastrService: ToastrService
  ) {}
  planovi: Observable<PlanTreninga[]> | null = null;
  ngOnInit(): void {
    this.planovi = this.treningService.getAll();
  }

  clickObrisi = false;

  obrisi(plan: PlanTreninga) {
    if(this.clickObrisi)
    {
      this.treningService.delete(plan.ID).subscribe(
        () => {
          this.load();
          this.toastrService.success('Uspešno obrisan plan treninga', 'Success');
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
    this.planovi = this.treningService.getAll();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { PlanIshrane } from 'src/app/models/plan_ishrane';
import { IshranaService } from 'src/app/services/ishrana.service';

@Component({
  selector: 'app-admin-ishrana',
  templateUrl: './admin-ishrana.component.html',
  styleUrls: ['./admin-ishrana.component.css'],
})
export class AdminIshranaComponent implements OnInit {
  constructor(
    private ishranaService: IshranaService,
    private toastrService: ToastrService
  ) {}

  planovi: Observable<PlanIshrane[]> | null = null;
  ngOnInit(): void {
    this.planovi = this.ishranaService.getAll();
  }

  clickObrisi = false;
  obrisi(plan: PlanIshrane) {
    if (this.clickObrisi) {
      this.ishranaService.delete(plan.ID).subscribe(
        () => {
          this.load();
          this.toastrService.success('Uspešno obrisan plan ishrane', 'Success');
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
    this.planovi = this.ishranaService.getAll();
  }
}

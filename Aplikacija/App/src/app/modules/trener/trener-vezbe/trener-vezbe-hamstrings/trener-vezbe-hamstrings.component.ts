import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vezba } from 'src/app/models/vezba';
import { TrenerService } from 'src/app/services/trener.service';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';

@Component({
  selector: 'app-trener-vezbe-hamstrings',
  templateUrl: './trener-vezbe-hamstrings.component.html',
  styleUrls: ['./trener-vezbe-hamstrings.component.css']
})
export class TrenerVezbeHamstringsComponent implements OnInit {
  
  constructor(private trenerService: TrenerService, private safePipe:SafePipe) {}

  vezbe: Observable<Vezba[]> | null = null;
  ngOnInit(): void {
    this.vezbe=this.trenerService.getVezbeHamstrings();
  }

}

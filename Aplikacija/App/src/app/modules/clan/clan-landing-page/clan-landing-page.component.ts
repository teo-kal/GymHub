import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Trener } from 'src/app/models/trener';

@Component({
  selector: 'app-clan-landing-page',
  templateUrl: './clan-landing-page.component.html',
  styleUrls: ['./clan-landing-page.component.css']
})
export class ClanLandingPageComponent implements OnInit {

  constructor(private router:Router) { }


  treneri:Observable<Trener[]> = of([]);

  ngOnInit(): void {
    // if(localStorage.getItem("visited")){
    //   this.router.navigateByUrl("/clan");
    // }
    // localStorage.setItem("visited","true");

  }

  ciljevi=[
    {
      name:"Smršam",
      value:"Mršavljenje",
    },
    {
      name:"Nabacim mišićnu masu",
      value:"Dobijanje mišićne mase"
    },
    {
      name:"Održavam i zategnem liniju",
      value:"Održavanje figure"
    } 
  ]
}

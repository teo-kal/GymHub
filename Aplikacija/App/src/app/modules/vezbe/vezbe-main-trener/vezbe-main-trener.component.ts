import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-vezbe-main-trener',
  templateUrl: './vezbe-main-trener.component.html',
  styleUrls: ['./vezbe-main-trener.component.css']
})
export class VezbeMainTrenerComponent implements OnInit {

  constructor(private router:Router) { 
    
  }

  ngOnInit(): void {
  }
  redirect(part:string){
    this.router.navigateByUrl(`/trener/vezbe/${part}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private httpClient:HttpClient, private authService:AuthService, private router:Router) { }

  welcome:Observable<string>
  ngOnInit(): void {
    this.welcome = this.httpClient.get<string>(`${environment.apiURL}admin`);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}

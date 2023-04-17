import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../models/userLoginDto';
import { UserLoginResponse } from '../models/userLoginResponse';
import { map } from 'rxjs/operators';
import { UserRegisterDto } from '../models/userRegisterDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private httpClient:HttpClient) {}


  decodedToken:any;
  login(user:UserLoginDto){
    return this.httpClient.post(`${environment.apiURL}nalog/login`,user).pipe(
      map((response:UserLoginResponse)=>{
        if(response.korisnikID!=-1){
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('tip',response.tipKorisnika);
          localStorage.setItem('korisnikID',response.korisnikID.toString());
          this.decodedToken = this.jwtHelper.decodeToken(response.accessToken);
        }
        return response;
      })
    )
  }
  loggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tip');
    localStorage.removeItem('korisnikID');
  }

  register(user:UserRegisterDto){
    return this.httpClient.post(`${environment.apiURL}nalog/register`, user).pipe(
      map((response:UserLoginResponse)=>{
        if(response.korisnikID!=-1){
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('tip',"C");
          localStorage.setItem('korisnikID',response.korisnikID.toString());
          this.decodedToken = this.jwtHelper.decodeToken(response.accessToken);
        }
        return response;
      })
    )
  }

  sendResetEmail(email:string, kod:string){
    return this.httpClient.post(`${environment.apiURL}nalog/posalji-reset-mail`, {Email:email, Kod:kod});
  }

  resetPassword(email:string, lozinka:string){
    return this.httpClient.put(`${environment.apiURL}nalog/resetuj-lozinku`,{Email:email, Lozinka:lozinka});
  }

  posaljiMejl(obj:any){
    return this.httpClient.post(`${environment.apiURL}nalog/posalji-info-mail`,obj);
  }
}

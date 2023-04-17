import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clan } from '../models/clan';
import { Trener } from '../models/trener';
import { Vezba } from '../models/vezba';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})

export class ClanService extends BaseService<Clan> {

  get route(): string {
    return 'admin/clanovi';
  }
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getMe(id:number){
    return this.httpClient.get<any>(`${environment.apiURL}clan/home-clan/${id}`);
  }
  getSviTreneri(){
    return this.httpClient.get<Trener[]>(`${environment.apiURL}clan/treneri`);
  }
  izaberiTrenera(obj:any){
    return this.httpClient.put(`${environment.apiURL}clan/treneri/zakazi`,obj);
  }
  oceniTrenera(obj:any){
    return this.httpClient.put(`${environment.apiURL}clan/trener/oceni`,obj);
  }
  getMePodesavanja(id:number){
    return this.httpClient.get<Clan>(`${environment.apiURL}clan/podesavanja/${id}`)
  }
  SetPodesavanja(obj:any){
    return this.httpClient.put(`${environment.apiURL}clan/podesavanja/potvrdi`,obj);
  }
  getMePrijaviProblem(id:number){
    return this.httpClient.get<Clan>(`${environment.apiURL}clan/prijavi-problem/${id}`)
  }
  posaljiMejlProblem(obj:any){
    return this.httpClient.post(`${environment.apiURL}clan/prijavi-problem/posalji-mail`,obj);
  }
  getMePlanoviTreninga(id:number){
    return this.httpClient.get(`${environment.apiURL}clan/planovi/trening/${id}`);
  }
  getMePlanoviIshrane(id:number){
    return this.httpClient.get(`${environment.apiURL}clan/planovi/ishrana/${id}`);
  }
  getSviTermini(){
    return this.httpClient.get(`${environment.apiURL}clan/pokazi-raspored`);
  }
  zakaziTrening(obj:any){
    return this.httpClient.post(`${environment.apiURL}clan/zakazi-trening`, obj)
  }
  otkaziTrening(ClanID:number){
    return this.httpClient.delete(`${environment.apiURL}clan/otkazi-trening/${ClanID}`);
  }
  platiClanarinu(obj:any){
    return this.httpClient.put(`${environment.apiURL}plati`,obj);
  }
  getTipClanarineZaPlacanje(id:number){
    return this.httpClient.get(`${environment.apiURL}plati/${id}`);
  }
  proveriTerminZaTrening(id:number, termin:string){
    return this.httpClient.get(`${environment.apiURL}clan/proveri-termin-trener/${id}`, {headers:{Termin:termin}});
  }
  //VEZBE
  getVezbeObliques(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/obliques`);
  }
  getVezbePecks(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/pecks`);
  }
  getVezbeGlutes(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/glutes`);
  }
  getVezbeHamstrings(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/hamstrings`);
  }
  getVezbeBiceps(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/biceps`);
  }
  getVezbeTriceps(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/triceps`);
  }
  getVezbeShoulders(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/shoulders`);
  }
  getVezbeCalves(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/calves`);
  }
  getVezbeQuads(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/quads`);
  }
  getVezbeBack(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}clan/vezbe/back`);
  }
  uploadSlika(id:number, file:FormData){
    return this.httpClient.post(`${environment.apiURL}clan/upload-sliku/${id}`,file);
  }
}

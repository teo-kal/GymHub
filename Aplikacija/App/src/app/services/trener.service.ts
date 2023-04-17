import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Obrok } from '../models/obrok';
import { Trener } from '../models/trener';
import { Vezba } from '../models/vezba';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TrenerService extends BaseService<Trener> {
  get route(): string {
    return 'admin/treneri';
  }

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getVezbeObliques() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/obliques`
    );
  }
  getVezbePecks() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/pecks`
    );
  }
  getVezbeGlutes() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/glutes`
    );
  }
  getVezbeHamstrings() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/hamstrings`
    );
  }
  getVezbeBiceps() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/biceps`
    );
  }
  getVezbeTriceps() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/triceps`
    );
  }
  getVezbeShoulders() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/shoulders`
    );
  }
  getVezbeCalves() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/calves`
    );
  }
  getVezbeQuads() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/quads`
    );
  }
  getVezbeBack() {
    return this.httpClient.get<Vezba[]>(
      `${environment.apiURL}trener/vezbe/back`
    );
  }
  getMe(id: number) {
    return this.httpClient.get(`${environment.apiURL}trener/home-trener/${id}`);
  }
  getMeKlijenti(id: number) {
    return this.httpClient.get(`${environment.apiURL}trener/klijenti/${id}`);
  }
  getMeOsobeGrupe(id: number) {
    return this.httpClient.get(
      `${environment.apiURL}trener/klijenti/grupa/${id}`
    );
  }
  getMePlanoviTreninga(id: number) {
    return this.httpClient.get(
      `${environment.apiURL}trener/planovi/trening/${id}`
    );
  }
  getMeVezbeZaPlanTreninga(id: number) {
    return this.httpClient.get(
      `${environment.apiURL}trener/planovi/trening/vezbe/${id}`
    );
  }
  createPlanTreninga(obj:any){
    return this.httpClient.post(`${environment.apiURL}trener/planovi/trening/kreiraj-plan`,obj);
  }
  createPlanIshrane(obj:any){
    return this.httpClient.post(`${environment.apiURL}trener/planovi/ishrana/kreiraj-plan`,obj);
  }
  getMePlanoviIshrane(id: number) {
    return this.httpClient.get(
      `${environment.apiURL}trener/planovi/ishrana/${id}`
    );
  }
  getMeObrociByTipIVrsta(tip:string, vrsta:string){
    return this.httpClient.get(
      `${environment.apiURL}trener/vrati-obroke-po-vrsti-tipu/${tip}/${vrsta}`
    );
  }
  getMeObrociZaPlanIshrane(id: number) {
    return this.httpClient.get(
      `${environment.apiURL}trener/planovi/ishrana/plan/${id}`
    );
  }
  getMeProblem(id: number) {
    return this.httpClient.get(
      `${environment.apiURL}trener/prijavi-problem/${id}`
    );
  }
  sendMail(obj: any) {
    return this.httpClient.post(
      `${environment.apiURL}trener/prijavi-problem/posalji-mail`,
      obj
    );
  }
  getMePodesavanja(id: number) {
    return this.httpClient.get(`${environment.apiURL}trener/podesavanja/${id}`);
  }
  setPodesavanja(obj){
    return this.httpClient.put(`${environment.apiURL}trener/sacuvaj-podesavanja`, obj)
  }
  dodajClanaUGrupu(obj: any) {
    return this.httpClient.put(
      `${environment.apiURL}trener/dodaj-u-grupu/`,
      obj
    );
  }
  izbaciClanaIzGrupe(obj:any){
    return this.httpClient.put(
      `${environment.apiURL}trener/izbaci-iz-grupe/`,
      obj
    );
  }
  dodeliPlanIshrane(obj:any){
    return this.httpClient.put(`${environment.apiURL}trener/dodeli-plan-ishrane`, obj);
  }
  dodeliPlanTreninga(obj:any){
    return this.httpClient.put(`${environment.apiURL}trener/dodeli-plan-treninga`, obj);
  }
  napraviVezbu(obj:Vezba){
    return this.httpClient.post(`${environment.apiURL}trener/vezbe/dodaj`,obj)
  }
  getSveVezbe(){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}trener/sve-vezbe`);
  }
  getVezbaByGroup(grupa:string){
    return this.httpClient.get<Vezba[]>(`${environment.apiURL}trener/vezbe/${grupa}`);
  }
  obrisiPlanTreninga(id:number){
    return this.httpClient.delete(`${environment.apiURL}trener/planovi/trening/obrisi-plan/${id}`);
  }
  obrisiPlanIshrane(id:number){
    return this.httpClient.delete(`${environment.apiURL}trener/planovi/ishrana/obrisi-plan/${id}`);
  }
  napraviNoviObrok(obj:Obrok){
    return this.httpClient.post(`${environment.apiURL}trener/planovi/ishrana/kreiraj-obrok`,obj);
  }
  uploadSlika(id:number, file:FormData){
    return this.httpClient.post(`${environment.apiURL}trener/upload-sliku/${id}`,file);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export abstract class BaseService<T> {
  abstract get route();

  constructor(protected httpClient: HttpClient) { }

  getAll() {
      return this.httpClient.get<T[]>(`${environment.apiURL}${this.route}`);
  }
  getOne(id: number) {
      return this.httpClient.get<T>(`${environment.apiURL}${this.route}/${id}`);
  }
  delete(id: number) {
      return this.httpClient.delete(`${environment.apiURL}${this.route}/obrisi/${id}`);
  }
  update(obj: T) {
      return this.httpClient.put<T>(`${environment.apiURL}${this.route}/izmeni`, obj);
  }
  create(obj: T) {
      return this.httpClient.post<T>(`${environment.apiURL}${this.route}/kreiraj`, obj);
  }
  potvrdiUplatuClana(obj:any){
    return this.httpClient.put(`${environment.apiURL}${this.route}/potvrdi-uplatu-clana`,obj);
  }
}

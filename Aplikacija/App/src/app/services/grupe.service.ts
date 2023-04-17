import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupa } from '../models/grupa';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GrupeService extends BaseService<Grupa> {

  constructor(httpClient:HttpClient) {
    super(httpClient);
  }
  get route(): any {
    return `admin/grupe`
  }
}

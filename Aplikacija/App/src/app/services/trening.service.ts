import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlanTreninga } from '../models/plan_treninga';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TreningService extends BaseService<PlanTreninga>{
  
  get route():string{
    return 'admin/trening'
  }

  constructor(httpClient:HttpClient) {
    super(httpClient);
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlanIshrane } from '../models/plan_ishrane';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class IshranaService extends BaseService<PlanIshrane> {
  get route(): string {
    return 'admin/ishrana';
  }

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}

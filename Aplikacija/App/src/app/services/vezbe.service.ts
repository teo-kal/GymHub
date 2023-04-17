import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vezba } from '../models/vezba';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VezbeService extends BaseService<Vezba>{

  get route():string{
    return 'admin/vezbe'
  }

  constructor(httpClient:HttpClient) {
    super(httpClient);
   }

}

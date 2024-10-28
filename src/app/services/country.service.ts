import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Country } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private api: ApiService) { }

  all: Country[] = [];
  async getAll() {
    if(this.all.length==0){
      this.all = await this.api.post('/country/getall');
    }
    return this.all
  }
}

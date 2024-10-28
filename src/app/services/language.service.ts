import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Language } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private api: ApiService) { }

  all: Language[] = [];
  async getAll() {
    if(this.all.length==0){
      this.all = await this.api.post('/language/getall');
    }
    return this.all
  }
}

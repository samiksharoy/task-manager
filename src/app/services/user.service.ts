import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  async register(userData: any): Promise<any> {
    return await this.api.post('/user/register', userData);
  }

}

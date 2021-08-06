import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }
  
  crearTienda(data: any) {
    return this.http.post(`${URL}/empresa`, data)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  getDatos() {
    return this.http.get(`${URL}/categorias-plaza`)
  }
}

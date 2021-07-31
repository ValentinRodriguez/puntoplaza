import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarioLogado = new EventEmitter()
  constructor(private http: HttpClient) { }

  login(forma: any) {
    return this.http.post(`${URL}/login`, forma)  
  }

  logout(email: any) {
    return this.http.post(`${URL}/logout`, email)
  }

  handleToken(data: any) {
    this.setDataLocalStorage(data);    
  }

  async isLogged() {
    let token = localStorage.getItem('token');
    console.log(token);
    
    if (token === null) {
      return false
    }
    return true;
  }

  setDataLocalStorage(data: any) {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.usuarioLogado.emit(true)
  }

  async unSetDataLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.usuarioLogado.emit(false)
  }
}

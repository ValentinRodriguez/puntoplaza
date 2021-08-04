import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarioLogado = new EventEmitter()
  private iss = {
    login: `${URL}/login`,
    signup: `${URL}/signup`,
  }  

  constructor(private http: HttpClient) { }

  login(forma: any) {
    return this.http.post(`${URL}/login`, forma)  
  }

  register(data: any) {
    return this.http.post(`${URL}/signup`, data)
  }

  logout(email: any) {
    return this.http.post(`${URL}/logout`, email)
  }

  handleToken(data: any) {
    this.setDataLocalStorage(data);    
  }

  loggedIn() {
    return this.validateToken()
  }

  validateToken() {
    const token = this.getTokenLocalStorage();
    let isLoggedIn = false
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        isLoggedIn =  Object.values(this.iss).indexOf(payload.iss) === 0 ? true : false;
      }
    }
    return isLoggedIn
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  getTokenLocalStorage() {
    return localStorage.getItem('token');
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

import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  mensajesError = new EventEmitter()
  
  constructor() { }

  emisorErrores(error: HttpErrorResponse, errores: any) {
    this.mensajesError.emit({ 'mensaje': error.error.message, 'error': errores });
  }
}

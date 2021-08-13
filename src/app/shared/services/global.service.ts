import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const urlProdPlaza = environment.urlProductosPlaza;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  mensajesError = new EventEmitter()
  
  constructor(@Inject(DOCUMENT) private document: Document) { }

  emisorErrores(error: HttpErrorResponse, errores: any) {
    this.mensajesError.emit({ 'mensaje': error.error.message, 'error': errores });
  }

  
  adminDashboard(num_oc: any) {
    const link = this.document.createElement('a');
    link.target = '_blank';
    link.href = `${urlProdPlaza}`;
    link.click();
    link.remove();
  }
}

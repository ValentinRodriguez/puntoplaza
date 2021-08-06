import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UiMessagesService } from '../ui-messages.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor( private message:UiMessagesService,) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return next.handle( req ) .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {        
          if (error instanceof HttpErrorResponse) {
            this.mensajeError(error)         
            return throwError(error);
          }else{        
            return throwError(error);
          }
        })
      )
    }

  mensajeError( error: HttpErrorResponse  ) {
    switch (error.status) {
      case 500:
        this.message.uiMessageError('Error interno del servidor', error.error.message);        
        break;

      case 501:
        this.message.uiMessageError('Error en consulta', error.error.data);
        break;

      case 502:
        this.message.uiMessageError('Error', error.error.data);       
        break;

      case 422:
        this.message.uiMessageError('Ya existe un usuario con estas credenciales', error.error.data);       
        break;

      case 405:
        this.message.uiMessageError('Error interno del servidor', error.error.data);        
        break;
        
      case 404:
        this.message.uiMessageError('Error', 'Dirección de solicitud no encontrada');       
        break;

      default:
        break;
    }
  }
}

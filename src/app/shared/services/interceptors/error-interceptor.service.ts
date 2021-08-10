import { EventEmitter, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  mensajesError = new EventEmitter()
  
  constructor() { }
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

  mensajeError(error: HttpErrorResponse) {
    const errores:string[] = []
    for (const property in error.error.errors) {
      errores.push(...error.error.errors[property])
    }
    this.mensajesError.emit({ 'mensaje': error.error.message, 'error': errores });
    
    // this.message.uiMessageError(errores,error.error.message);  
      // switch (error.status) {
      //   case 500:
      //     this.message.uiMessageError('Error interno del servidor', errores);        
      //     break;

      //   case 501:
      //     this.message.uiMessageError('Error en consulta', error.error.data);
      //     break;

      //   case 502:
      //     this.message.uiMessageError('Error', error.error.data);       
      //     break;

      //   case 422:
      //     this.message.uiMessageError('Ya existe un usuario con estas credenciales', error.error.data);       
      //     break;

      //   case 405:
      //     this.message.uiMessageError('Error interno del servidor', error.error.data);        
      //     break;
          
      //   // case 404:
      //   //   this.message.uiMessageError('Error', 'Dirección de solicitud no encontrada');       
      //   //   break;

      //   default:
      //     break;
      // }
    }
}

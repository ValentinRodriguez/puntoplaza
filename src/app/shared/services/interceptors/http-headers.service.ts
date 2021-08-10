import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from '../users.service';


@Injectable({
  providedIn: 'root'
})
export class HttpHeadersService implements HttpInterceptor{
  
  constructor(private usuarioService:UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'put' || req.method.toLowerCase() === 'delete') {     
      if (req.body instanceof FormData) {
        req =  req.clone({
          setHeaders: {
            'enctype'      : 'multipart/form-data',
            'Authorization': `Bearer ${this.usuarioService.getTokenLocalStorage()}`,
          }          
        })
      } else {
        const foo = {}; 
        req =  req.clone({
          setHeaders: {
            'enctype'      : 'multipart/form-data',
            'Authorization': `Bearer ${this.usuarioService.getTokenLocalStorage()}`,
          },
          body: {...req.body, ...foo}
        })
      }
    }

    if (req.method.toLowerCase() === 'get') {    
      req = req.clone({
        setHeaders: {
          'enctype'      : 'multipart/form-data',
          'Authorization': `Bearer ${this.usuarioService.getTokenLocalStorage()}`,
        }  
      });
    }

    return next.handle(req).pipe(      
      tap(evt => {        
        if (evt instanceof HttpResponse) {
          // this.globalFuntionServ.formReceived.emit(false);
          console.log('enviando request');          
          // if (evt.ok === true) {     
          // }            
        }
    })
    )
  }
}

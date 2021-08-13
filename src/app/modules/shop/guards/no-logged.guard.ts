import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedGuard implements CanActivate {

  constructor(public usuarioServ: UsersService,
              public router: Router){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {    
    if (this.usuarioServ.loggedIn()) {  
      this.router.navigateByUrl('/')  
      return false;
    } else {     
      return true;
    }
  }
  
}

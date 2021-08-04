import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(public usuarioServ: UsersService,
                public router: Router){}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean  {    
      if (this.usuarioServ.loggedIn()) {  
        return true;
      } else {
        this.router.navigateByUrl('/account/login')      
        return false;
      }
    }
}

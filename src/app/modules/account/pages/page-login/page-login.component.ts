import { Component } from '@angular/core';
import { UsersService } from "../../../../shared/services/users.service";

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
  form = {
        email: 'valentinrodriguez1427@gmail.com',
        password: null
  };
  
  form2 = {
    email: 'valentinrodriguez1428@gmail.com',
    password: '123',
    username: 'v',            
    name: 'v',                 
    surname: 'v',               
    is_vend: 'v',                
    password_confirmation: '123',
    foto: '',                 
    impresora: '',
    tipo: 'store',
    estado: 'activo',               
  };

    constructor(private usuarioServ: UsersService) { }

    onSubmit() {
        console.log('aqui');
        
        this.usuarioServ.login(this.form).subscribe((resp: any) => {
          if (resp) {       
            this.handleResponse(resp)
          } else {        
            this.showErrorViaMessages();
          }   
        });
    }
    
    onRegister() {
      console.log(this.form2);
      this.usuarioServ.register(this.form2).subscribe((resp: any) => {
        console.log(resp);        
      })
    }
  
    handleResponse(data: any) {
        console.log(data);          
        // this.router.navigateByUrl('/');     
        //this.usuarioServ.handleToken(data);
    }
    
    showErrorViaMessages() {
          console.log('ERROR LOGIN');
          
        // this.msgs = [];
        // this.msgs.push({ severity: 'error', summary: 'Credenciales incorrectas' });
    }
}

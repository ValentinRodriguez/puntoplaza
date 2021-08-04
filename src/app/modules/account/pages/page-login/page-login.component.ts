import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/shared/services/clientes/clientes.service';
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
    
  constructor(private usuarioServ: UsersService) {}

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

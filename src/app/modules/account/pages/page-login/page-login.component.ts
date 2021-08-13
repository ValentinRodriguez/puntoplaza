import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  enviando = false;
    
  constructor(private usuarioServ: UsersService,
              private router: Router) {}

  onSubmit() {    
    this.enviando = true;
    this.usuarioServ.login(this.form).subscribe((resp: any) => {            
        this.enviando = false;         
        if (resp.code == 200) {       
            this.handleResponse(resp.data)
        }  
    });
  }

  handleResponse(data: any) {  
    this.usuarioServ.handleToken(data);
    this.router.navigateByUrl('/');     
  }
  
  showErrorViaMessages() {
    console.log('ERROR LOGIN');

    // this.msgs = [];
    // this.msgs.push({ severity: 'error', summary: 'Credenciales incorrectas' });
  }
}

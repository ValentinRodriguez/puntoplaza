import { Component } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
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
  
  forma!: FormGroup;
  
  constructor(private usuarioServ: UsersService,
              private fb: FormBuilder) {
                this.crearFormulario();
               }

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

  get email() {   
    return this.forma.get('email') as unknown as FormControlName;
  }

  get tipo() {   
    return this.forma.get('is_vend') as unknown as FormControlName;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      name:                  ['vendedor', Validators.required],
      surname:               ['tienda', Validators.required],
      email:                 ['valentinrodriguez1428@gmail.com', Validators.required],
      is_vend:               ['v', Validators.required],
      password:              ['123', Validators.required],
      password_confirmation: ['123', Validators.required],
      username:              ['', Validators.required],
      foto:                  [''],
      nombre_tienda:         ['tienda 1'],
      telefono:              ['8294552254'],
      direccion:             ['asdfa sadf asdfasdf erer', Validators.required],
      tipo:                  ['store', Validators.required],
      estado:                ['activo', Validators.required],
    })
  }

  onRegister() {
    console.log(this.email.value);
    const arr = this.email.value.split('@');
    this.forma.get('username')?.setValue(arr[0]);
    console.log(this.forma.value);
    
    this.usuarioServ.register(this.forma.value).subscribe((resp: any) => {
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

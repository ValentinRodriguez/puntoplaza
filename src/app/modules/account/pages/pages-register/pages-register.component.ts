import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/shared/services/clientes/clientes.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.scss']
})
export class PagesRegisterComponent implements OnInit {

  forma!: FormGroup;
  documentos: any[] = [];
  cedula = true;
  rnc = false;
  pasaporte = false;

  constructor(private usuarioServ: UsersService,
            private ClientesServ: ClientesService,
            private fb: FormBuilder) {
              this.crearFormulario();
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
      tipo_documento:        [''], 
      documento:             [''],
      nombre_tienda:         ['tienda 1'],
      telefono:              ['8294552254'],
      direccion:             ['asdfa sadf asdfasdf erer', Validators.required],
      tipo:                  ['store', Validators.required],
      estado:                ['activo', Validators.required],
    })
  }

  ngOnInit() {
    this.ClientesServ.getDocumentos().subscribe((resp: any) => {
      this.documentos = resp.data;      
      this.forma.get('tipo_documento')?.setValue(2);
    })
  }

  tipoDoc(doc: any) {
    console.log(doc.target.value);

    if (doc.target.value == 1) {
      this.cedula = false;
      this.rnc = false;
      this.pasaporte = true;
    } 
    if (doc.target.value == 2) {
      this.cedula = true;
      this.rnc = false;
      this.pasaporte = false;
    } 
    if (doc.target.value == 3) {
      this.cedula = false;
      this.rnc = true;
      this.pasaporte = false;
    } 
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

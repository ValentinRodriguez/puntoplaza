import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { TiendaService } from 'src/app/modules/shop/services/tienda/tienda.service';
import { ClientesService } from 'src/app/shared/services/clientes/clientes.service';
import { UiMessagesService } from 'src/app/shared/services/ui-messages.service';
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
  usuario: any;
  message: any;
  
  constructor(private usuarioServ: UsersService,
              private tiendasServ: TiendaService,
              private ClientesServ: ClientesService,
              private uiMessage: UiMessagesService,
              private fb: FormBuilder) {    
                this.usuario = this.usuarioServ.getUserLogged()
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
      email:                 ['', Validators.required],
      password:              ['', Validators.required],
      password_confirmation: ['', Validators.required],

      name:                  [''],
      surname:               [''],
      is_vend:               ['c'],
      username:              [''],
      foto:                  [''],
      tipo_documento:        [''], 
      documento:             [''],
      nombre_tienda:         [''],
      telefono:              [''],
      direccion:             [''],
      tipo:                  ['store'],
      estado:                ['activo'],
      usuario_creador:       ['movilsoluciones'],
      usuario_modificador:   ['']
    })
  }

  ngOnInit() {
    this.ClientesServ.getDocumentos().subscribe((resp: any) => {
      this.documentos = resp.data;      
      this.forma.get('tipo_documento')?.setValue(2);
    })
    this.setValidation();
  }

  tipoDoc(doc: any) {
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
  
  setValidation() {
    this.forma.get('is_vend')?.valueChanges.subscribe(value =>{
      const  name = this.forma.get('name');
      const surname = this.forma.get('surname');
      const  username = this.forma.get('username');
      const  tipo_documento = this.forma.get('tipo_documento');
      const  nombre_tienda = this.forma.get('nombre_tienda');
      const  telefono = this.forma.get('telefono');
      const  direccion = this.forma.get('direccion');

      if (value === 'v') {
        name?.setValidators(Validators.required);
        surname?.setValidators(Validators.required);
        username?.setValidators(Validators.required);
        tipo_documento?.setValidators(Validators.required);
        nombre_tienda?.setValidators(Validators.required);
        telefono?.setValidators(Validators.required);
        direccion?.setValidators(Validators.required);
      } else {
        name?.clearValidators();
        surname?.clearValidators();
        username?.clearValidators();
        tipo_documento?.clearValidators();
        nombre_tienda?.clearValidators();
        telefono?.clearValidators();
        direccion?.clearValidators();
      }   
      console.log(this.forma.invalid);       
    })
  }

  onRegister() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control =>{          
        control.markAllAsTouched();
      }); 
    } else {
      this.message = this.uiMessage.uiMessageAutoClose('Registrando usuario', '')
      setTimeout(() => {
        this.usuarioServ.register(this.forma.value).subscribe((resp: any) => {
          console.log(resp);
          this.message.close();
          if (resp.code === 200) {
            this.handleResponse(resp.data);            
            if (this.tipo.value === 'v') {
              this.crearTienda();
            } else {
              this.uiMessage.successMessage('Proceso completado.', 3000);              
            }
          }       
        });        
      }, 3000);
    }
  }

  crearTienda() {
    const obj = {
      nombre:            this.forma.get('nombre_tienda')?.value,
      telefono_empresa:  this.forma.get('telefono')?.value,
      email_empresa:     this.forma.get('email')?.value,
      documento:         this.forma.get('documento')?.value || 'xxx-xxxxxxx-x',
      tipo_documento:    '1',
      id_pais:           '1',
      id_region:         '7',
      id_provincia:      '19',
      id_municipio:      '69',
      id_ciudad:         '69',
      calle:             this.forma.get('direccion')?.value,
      web:               '',
      contacto:          this.forma.get('surname')?.value,
      telefono_contacto: this.forma.get('telefono')?.value,
      moneda:            '1',
      empresa_verde:     'si',
      tipo_cuadre:       'm',
      valuacion_inv:     'standard',
      tipo_empresa:      'D',
      logo:              '',
      estado:            'activo',
      usuario_creador:   'movilsoluciones' 
    }
    this.message = this.uiMessage.uiMessageAutoClose('Construyendo tu tienda...', '')
    setTimeout(() => {
      this.tiendasServ.crearTienda(obj).subscribe((resp: any) => {
        console.log(resp);
        this.message.close();
        if (resp.code === 200) {
          this.uiMessage.successMessage('Proceso completado.', 1500);
        }
      })
    }, 3000);
  }

  handleResponse(data: any) {
    console.log(data);          
    // this.router.navigateByUrl('/');     
    this.usuarioServ.handleToken(data);
  }

  showErrorViaMessages() {
    console.log('ERROR LOGIN');
    // this.msgs = [];
    // this.msgs.push({ severity: 'error', summary: 'Credenciales incorrectas' });
  }

  getNoValido(input: string) {
    return this.forma.get(input)?.invalid && this.forma.get(input)?.touched;
  }
}

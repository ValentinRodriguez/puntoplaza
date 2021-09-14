import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/modules/shop/services/tienda/tienda.service';
import { ClientesService } from 'src/app/shared/services/clientes/clientes.service';
import { GlobalService } from 'src/app/shared/services/global.service';
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
  errores: any[] = [];
  tipo: string = '';

  constructor(private usuarioServ: UsersService,
              private tiendasServ: TiendaService,
              private ClientesServ: ClientesService,
              private uiMessage: UiMessagesService,
              private globalServ: GlobalService,
              private route: Router,
              private fb: FormBuilder) {    
                this.usuario = this.usuarioServ.getUserLogged()
                this.crearFormulario();
            }

  get email() {   
    return this.forma.get('email') as unknown as FormControlName;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      email:                 ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:              ['123', Validators.required],
      password_confirmation: ['123', Validators.required],

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
    }, { 
      validator: this.ConfirmedValidator('password', 'password_confirmation')
    })
  }

  get passwordRepetido(){
    return this.forma.controls.password_confirmation.errors?.confirmedValidator;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  
  ngOnInit() {
    this.ClientesServ.getDocumentos().subscribe((resp: any) => {
      this.documentos = resp.data;   
      this.forma.get('tipo_documento')?.setValue(2);
    })

    this.globalServ.mensajesError.subscribe((resp: any) => {
      this.errores = resp.error;    
      this.message.close();
      setTimeout(() => {
        this.toTop();        
      }, 500);
    });
    this.setValidation();
  }

  tipoDoc(doc: any) {
    
    
    if (doc.target.value == 1) {
      this.cedula = true;
      this.rnc = false;
      this.pasaporte = false;
    } 
    if (doc.target.value == 2) {
      this.cedula = false;
      this.rnc = true;
      this.pasaporte = false;
    } 
    if (doc.target.value == 3) {
      this.cedula = false;
      this.rnc = false;
      this.pasaporte = true;
    }
    if (doc.target.value == 4) {
      this.cedula = false;
      this.rnc = false;
      this.pasaporte = false;
    } 
  }
  
  setValidation() {
    this.forma.get('is_vend')?.valueChanges.subscribe(value => {
      this.tipo = value;
      const  tipo_documento = this.forma.get('tipo_documento');
      const  nombre_tienda = this.forma.get('nombre_tienda');
      const  telefono = this.forma.get('telefono');
      const  direccion = this.forma.get('direccion');

      if (value === 'v') {
        tipo_documento?.setValidators(Validators.required);
        nombre_tienda?.setValidators(Validators.required);
        telefono?.setValidators(Validators.required);
        direccion?.setValidators(Validators.required);
      } else {
        tipo_documento?.clearValidators();
        nombre_tienda?.clearValidators();
        telefono?.clearValidators();
        direccion?.clearValidators();
      }   
      
    })
  }

  onRegister() {
    // this.globalServ.adminDashboard(1);
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control =>{          
        control.markAllAsTouched();
      }); 
    } else {
      this.errores = [];
      this.message = this.uiMessage.uiMessageAutoClose('Registrando usuario', '')
      setTimeout(() => {
        this.usuarioServ.register(this.forma.value).subscribe((resp: any) => {                    
          this.message.close();          
          if (resp.code === 200) {            
            this.getAccessToken(this.forma.value);           
          }       
        });        
      }, 2000);
    }
  }

  getAccessToken(data: any) {
    this.message = this.uiMessage.uiMessageAutoClose('Adquiriendo Credenciales', '');
    setTimeout(() => {
      this.usuarioServ.getMyOauthToken(data).subscribe((resp: any) => {
        this.message.close();        
        const obj = Object.assign(data, resp);        
        if (this.tipo === 'v') {
          this.crearTienda(obj);
        } else {
          this.handleResponse(obj);            
          this.uiMessage.successMessage('Proceso completado.');              
        }       
      })
    }, 2000);
  }

  crearTienda(data: any) {
    const obj = {
      nombre:            this.forma.get('nombre_tienda')?.value,
      telefono_empresa:  this.forma.get('telefono')?.value,
      email_empresa:     this.forma.get('email')?.value,
      documento:         this.forma.get('documento')?.value || 'xxx-xxxxxxx-x',
      tipo_documento:    this.forma.get('tipo_documento')?.value,
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
        this.message.close();
        if (resp.code === 200) {
          const obj2 = Object.assign(data, resp.data);
          this.handleResponse(obj2)
          this.uiMessage.successMessage('Proceso completado.');
        }
      })
    }, 2000);
  }

  handleResponse(data: any) {    
    // this.router.navigateByUrl('/');     
    this.usuarioServ.handleToken(data);
  }

  toTop(): void {
    try {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    } catch {
        window.scrollTo(0, 0);
    }
  }

  
  getNoValido(input: string) {
    return this.forma.get(input)?.invalid && this.forma.get(input)?.touched;
  }

  emailInvalido(input: string) {
    return this.forma.get(input)?.errors?.pattern && this.forma.get(input)?.touched;
  }
}

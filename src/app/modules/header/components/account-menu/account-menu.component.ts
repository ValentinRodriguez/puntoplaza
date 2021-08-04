import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    
    form = {
        email: null,
        password: null
    };

    logado = false;
    enviando = false

    constructor(private usuarioServ: UsersService,
                private router: Router) { }

    ngOnInit() {
        this.usuarioServ.usuarioLogado.subscribe((resp: boolean) => {
            this.logado = resp;
        })
        this.logado = this.usuarioServ.loggedIn();
        console.log(this.logado);
    }

    onSubmit() {
        this.enviando = true;
        this.usuarioServ.login(this.form).subscribe((resp: any) => {
            this.enviando = false;
          if (resp) {       
            this.handleResponse(resp)
          } else {        
            this.showErrorViaMessages();
          }   
        });
    }
    
    logOut() {
        this.usuarioServ.logout(this.form.email).subscribe((resp: any) => {
            if (resp['code'] === 200) {
                this.usuarioServ.unSetDataLocalStorage().then(() => {
                    this.closeMenu.emit();
                    this.router.navigateByUrl('/')
                })
            }
        })
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
}

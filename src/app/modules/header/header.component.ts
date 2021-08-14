import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';
import { StoreService } from '../../shared/services/store.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    
    @Input() layout: 'classic' | 'compact' = 'classic';

    constructor(private usuarioServ: UsersService,
                private globalServ: GlobalService,
                private router: Router ) { }

    navegar() {
        if (this.usuarioServ.loggedIn()) {
            this.globalServ.adminDashboard(1)            
        } else {
            this.router.navigate(['/account/login']);
        }
    }
}

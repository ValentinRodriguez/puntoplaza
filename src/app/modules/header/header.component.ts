import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../shared/services/store.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() layout: 'classic'|'compact' = 'classic';

    constructor(public store: StoreService,
                private router: Router) { }

    navegar(ruta:string) {
        this.router.navigate([ruta]);
    }
}

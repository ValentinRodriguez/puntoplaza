import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// modules (angular)
import { CommonModule } from '@angular/common';

// modules
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/shared.module';

// components
import { LayoutComponent } from './components/layout/layout.component';

// pages
import { PageAddressesListComponent } from './pages/page-addresses-list/page-addresses-list.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PlanesComponent } from './pages/pages-planes/planes.component';

@NgModule({
    declarations: [
        // components
        LayoutComponent,
        // pages
        PageAddressesListComponent,
        PageDashboardComponent,
        PageLoginComponent,
        PageOrdersListComponent,
        PagePasswordComponent,
        PageProfileComponent,
        PageOrderDetailsComponent,
        PageEditAddressComponent,
        PagesRegisterComponent,
        PlanesComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        // modules
        FormsModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        SharedModule
    ]
})
export class AccountModule { }

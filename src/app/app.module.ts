import { /*LOCALE_ID, */NgModule } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
// import localeIt from '@angular/common/locales/it';
//
// registerLocaleData(localeIt, 'it');

// modules (angular)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';

// modules
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { FooterModule } from './modules/footer/footer.module';
import { HeaderModule } from './modules/header/header.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { SharedModule } from './shared/shared.module';
import { WidgetsModule } from './modules/widgets/widgets.module';


// import { InventarioModule } from './shared/services/inventario/inventario.module';

// components
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';

// pages
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageOffcanvasCartComponent } from './pages/page-offcanvas-cart/page-offcanvas-cart.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './shared/services/interceptors/error-interceptor.service';
import { HttpHeadersService } from './shared/services/interceptors/http-headers.service';


@NgModule({
    declarations: [
        // components
        AppComponent,
        RootComponent,
        // pages
        PageHomeOneComponent,
        PageHomeTwoComponent,
        PageNotFoundComponent,
        PageOffcanvasCartComponent
    ],
    imports: [
        // modules (angular)
        // HttpClientModule
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // modules (third-party)
        CarouselModule,
        ToastrModule.forRoot(),
        // modules
        AppRoutingModule,
        BlocksModule,
        FooterModule,
        HeaderModule,
        MobileModule,
        SharedModule,
        WidgetsModule,
        // InventarioModule,
    ],
    providers: [
        // { provide: LOCALE_ID, useValue: 'it' }
        {   provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true,
        },
        {   provide: HTTP_INTERCEPTORS,
            useClass: HttpHeadersService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

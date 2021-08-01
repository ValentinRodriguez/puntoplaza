import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriasService } from './categorias.service';


HttpClientModule
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CategoriasService
  ]
})
export class InventarioModule { }

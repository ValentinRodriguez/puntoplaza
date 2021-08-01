import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/shared/services/inventario/categorias.service';

@Component({
  selector: 'app-pages-create-product',
  templateUrl: './pages-create-product.component.html',
  styleUrls: ['./pages-create-product.component.scss']
})
export class PagesCreateProductComponent implements OnInit {

  categorias:any[] = [];

  constructor(private categoriasServ: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasServ.getDatos().subscribe((resp: any) => {
      if (resp.code === 200) {
        this.categorias = resp.data;        
      }
    })
  }

  getCategoryName(category: any): string {
    return '&nbsp;'.repeat(category.depth * 2) + category.descripcion;
  }



}

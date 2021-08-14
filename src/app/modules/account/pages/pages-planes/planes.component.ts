import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/modules/shop/services/tienda/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {

  planes: any[] = [];

  constructor(private planesServ: PlanesService) { }

  ngOnInit(): void {
    this.planesServ.planes().subscribe((resp: any) =>{
      this.planes = resp.data;      
      this.planes.forEach(element => {
        if (element.tipo != 1) {
          element.cent = element.precio.split('.')[1]; 
          element.precio = element.precio.split('.')[0];     
        }
        element.detalles = JSON.parse(element.detalles);
      });
      console.log(this.planes);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/producto/productos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  id: any;
  detalleProducto: any=[];
  category: any;
  title: any;
  image: any;
  description: any;
  price: any;
  idDetalle: any;
  agregarCarrito: any=[];
  cont: number = 0;
  totalProductos: number = 0;

  constructor(private servicesProductos: ProductosService, private router: Router, private actRoute: ActivatedRoute) { 
    this.id = Number(this.actRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.idDetalleProducto();
  }

  idDetalleProducto(){
    this.servicesProductos.idProductos(this.id).toPromise().then(resp =>{
      this.category = resp.category;
      this.idDetalle = resp.id
      this.title = resp.title;
      this.image = resp.image;
      this.description = resp.description;
      this.price = resp.price;
    });
  }

  desplegableCarrito(){
    if($('.hidden-cart').css('display') == 'none'){
      $('.hidden-cart').css('display','block')
    }else{
      $('.hidden-cart').css('display','none')
    }
  }

  getCarrito(){
    this.servicesProductos.obtenerProductos().toPromise().then(resp =>{
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        if(element.id == this.idDetalle){
          this.agregarCarrito.push(element)
          this.cont ++
          this.totalProductos += element.price
        }
      }
    });
  }

  menu(){
    this.router.navigateByUrl('');
  }

}

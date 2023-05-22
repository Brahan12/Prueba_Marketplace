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
  vacio: boolean = false;
  data: any=[];
  datosCarro: any=[];
  contProducto: number = 0;
  producto: any=[];
  agregarCarritoFinal: any=[];
  unicos: any=[];
  agregarCarritoi: any=[];

  constructor(private servicesProductos: ProductosService, private router: Router, private actRoute: ActivatedRoute) { 
    this.id = Number(this.actRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.idDetalleProducto();
    this.data = sessionStorage.getItem('datos')
    this.datosCarro = JSON.parse(this.data)
    if(this.datosCarro != null){
      this.agregarCarrito= this.datosCarro
      for (let index = 0; index < this.datosCarro.length; index++) {
        const element = this.datosCarro[index];
        this.cont++;
        this.totalProductos += element.price;
        if(!this.unicos.includes(element.id)){
          this.agregarCarritoFinal.push(element)
          this.unicos.push(element.id)
        }
      }
    }
  }

  idDetalleProducto(){
    this.servicesProductos.idProductos(this.id).toPromise().then(resp =>{
      this.producto.push(resp)
    });
  }

  desplegableCarrito(){
    if($('.hidden-cart').css('display') == 'none'){
      $('.hidden-cart').css('display','block')
      if(this.cont == 0){
        this.vacio = true
      }else{
        this.vacio = false
      }
    }else{
      $('.hidden-cart').css('display','none')
    }
  }

  getCarrito(data:any){
    this.servicesProductos.obtenerProductos().toPromise().then(resp =>{
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        if(element.id == data.id){
          this.cont ++
          this.agregarCarrito.push(element)
          this.totalProductos += element.price
          sessionStorage.setItem('datos',JSON.stringify(this.agregarCarrito))
          for (let i = 0; i < this.agregarCarrito.length; i++) {
            const element2 = this.agregarCarrito[i];
            if(element.id === element2.id){
              if(!this.unicos.includes(element2.id)){
                this.agregarCarritoFinal.push(element2)
                this.unicos.push(element2.id)
              }
            }
          }
        }
      }
    });
  }


  eliminar(id:any){
    for (let index = 0; index < this.agregarCarritoFinal.length; index++) {
      if(this.agregarCarritoFinal[index].id == id){
        if(this.agregarCarritoFinal.length == 1){
          this.cont = 0;
        }
        this.agregarCarritoFinal.splice(index, 1)
        for (let i = 0; i < this.agregarCarrito.length; i++) {
          const element = this.agregarCarrito[i];
          if(id == element.id){
            this.cont--;
            this.totalProductos -= this.agregarCarrito[i].price
            this.agregarCarrito.splice(i, 1)
          }
        }
        break
      };
    }
    if(this.agregarCarritoFinal.length > 0){
      for (let i = 0; i < this.agregarCarrito.length; i++) {
        const element = this.agregarCarrito[i];
        if(element.id == id){
          this.totalProductos -= this.agregarCarrito[i].price
          this.cont--;
          this.agregarCarrito.splice(i, 1)
          sessionStorage.setItem('datos',JSON.stringify(this.agregarCarrito))
        }
      }
    }
    if(this.agregarCarritoFinal.length == 0){
      sessionStorage.removeItem('datos')
      window.location.reload();
    }
  }

  menu(){
    this.router.navigateByUrl('');
  }

}

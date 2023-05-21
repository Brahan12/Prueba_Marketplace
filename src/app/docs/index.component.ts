import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/producto/productos.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  listCategorias: any=[];
  carrusel: any | null;
  maxScrollLeft: any;
  intervalo: any;
  step: any;
  productos: any=[];
  filter: any;
  validProductos: any=[];
  productosCarrusel: any=[];
  btnCart: any;
  containerCartProducts: any;
  cartInfo: any;
  rowProduct: any;
  productsList: any;
  allproducts: any=[];
  productosCarro: any=[];
  total: number = 0;
  totalofProductos: number = 0;
  valorTotal: any;
  countProducts: any;
  bandera: any;
  view: any;
  productosElectronicos: any=[];
  productosJoyeria: any=[];
  productosHombre: any=[];
  productosMujer: any=[];

  constructor(private servicesProductos: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.bandera = 1
    this.listProductos();
    this.carruselP();
    this.allproducts = localStorage.getItem('datos')
  }

  listProductos(){
    this.servicesProductos.obtenerProductos().toPromise().then(resp =>{
        if(this.bandera == 1){
          this.productos = resp
          this.productosCarrusel = resp
          this.validProductos = resp
        }else if(this.bandera == 2){
          for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            if(element.category == 'electronics'){
              this.productosElectronicos.push(element)
              this.productos = this.productosElectronicos
              this.productosCarrusel = resp
              this.validProductos = this.productosElectronicos
            }
          }
        }else if(this.bandera == 3){
          for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            if(element.category == 'jewelery'){
              this.productosJoyeria.push(element)
              this.productos = this.productosJoyeria
              this.productosCarrusel = resp
              this.validProductos = this.productosJoyeria
            }
          }
        }else if(this.bandera == 4){
          for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            if(element.category == "men's clothing"){
              this.productosHombre.push(element)
              this.productos = this.productosHombre
              this.productosCarrusel = resp
              this.validProductos = this.productosHombre
            }
          }
        }else{
          for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            if(element.category == "women's clothing"){
              this.productosMujer.push(element)
              this.productos = this.productosMujer
              this.productosCarrusel = resp
              this.validProductos = this.productosMujer
            }
          }
        }
    });
  }

  desplegableCarrito(){
    if($('.hidden-cart').css('display') == 'none'){
      $('.hidden-cart').css('display','block')
    }else{
      $('.hidden-cart').css('display','none')
    }
  }

  detalle(id:any){
    this.router.navigateByUrl('/detalle/'+id);
  }


  menu(id:any){
    this.bandera = id;
    this.listProductos();
  }

  
  // Función carrusel
  carruselP(){
    this.carrusel = document.querySelector(".carrusel-items");
    this.maxScrollLeft = this.carrusel.scrollWidth - this.carrusel.clientWidth;
    this.intervalo = null;
    this.step = 1;
    const start = () => {
      this.intervalo = setInterval( () => {
        this.carrusel.scrollLeft = this.carrusel.scrollLeft + this.step;
        if (this.carrusel.scrollLeft === this.maxScrollLeft) {
          this.step = this.step * -1;
        } else if (this.carrusel.scrollLeft === 5047) {
          this.step = this.step * -1;
        }
      }, 10);
    };

    const stop = () => {
      clearInterval(this.intervalo);
    };

    this.carrusel.addEventListener("mouseover", () => {
      stop();
    });

    this.carrusel.addEventListener("mouseout", () => {
      start();
    });

    start();
  }
  

  // Función buscador
  filtro(){
    let array = []
    if(this.filter==""||this.filter==null||this.filter==undefined){
      let unicos: any=[];
      for (let index = 0; index < this.validProductos.length; index++) {
        const element = this.validProductos[index];
        if(!unicos.includes(this.validProductos[index])){
          unicos.push(element);
        }
      }
      return this.productos = unicos
    }else{
      for(var elemento of this.validProductos){
        if(elemento.title.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())){
          array.push(elemento)
        }else if(String(elemento.price).toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())){
          array.push(elemento)
        }
      }
      let unicos: any=[];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(!unicos.includes(array[index])){
          unicos.push(element);
        }
      }
      return this.productos = unicos
    }
  }
}

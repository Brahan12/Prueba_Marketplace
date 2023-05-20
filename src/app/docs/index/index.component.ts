import { Component, OnInit } from '@angular/core';
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

  constructor(private servicesProductos: ProductosService) { }

  ngOnInit(): void {
    this.listProductos();
    this.carruselP();
  }

  listProductos(){
    this.servicesProductos.obtenerProductos().toPromise().then(resp =>{
      this.productos = resp
      this.productosCarrusel = resp
      this.validProductos = resp
    });
  }

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
          debugger
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
      debugger
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

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
  valorTotal: any;
  countProducts: any;
  bandera: any;
  view: any;
  productosElectronicos: any=[];
  productosJoyeria: any=[];
  productosHombre: any=[];
  productosMujer: any=[];
  cont: number = 0;
  vacio: boolean = false;
  agregarCarrito: any=[];
  totalProductos: number = 0;
  contElement: number = 0;
  unicos: any=[];
  agregarCarritoFinal: any=[];
  data: any=[];
  datosCarro: any=[];
  btn: any;

  constructor(private servicesProductos: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.bandera = 1
    this.listProductos();
    this.carruselP();
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
  
  descargarCSV(){
    const options = {
      title: 'Productos',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['ID','Titulo','Precio','Descripcion','Categoria','Imagen']
    };

    new ngxCsv(this.agregarCarrito,"reporte",options)
    $('.hidden-cart').css('display','none')
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

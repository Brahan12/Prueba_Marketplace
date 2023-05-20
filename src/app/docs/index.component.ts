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
  bandera: boolean = false;
  view: any;

  constructor(private servicesProductos: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.view = 1
    this.router.navigateByUrl('/index/productos');
    this.listProductos();
    this.carruselP();
  }

  listProductos(){
    this.servicesProductos.obtenerProductos().toPromise().then(resp =>{
        this.productos = resp
        this.productosCarrusel = resp
        this.validProductos = resp
        this.carritoCompras();
    });
  }

  carritoCompras(){
    this.bandera = true
    this.btnCart = document.querySelector('.container-cart-icon');
    this.containerCartProducts = document.querySelector('.container-cart-products');
    // agregar card carrito
    this.cartInfo = document.querySelector(".cart-product");
    this.rowProduct = document.querySelector('.row-product');
    this.productsList = document.querySelector('.containerCard')

    this.btnCart.addEventListener('click', () => {
        this.containerCartProducts.classList.toggle('hidden-cart')
    })

    this.allproducts = [];

    this.valorTotal = document.querySelector('.total-pagar');

    this.countProducts = document.querySelector('#contador-productos')


    this.rowProduct.addEventListener('click', (e:any) =>{
      if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        for (let i = 0; i < this.allproducts.length; i++) {
          if(this.allproducts[i].title == title){
            this.allproducts.splice(i, 1);
            this.showItems();
            break;
          }
        }
      }
    });
  }

  boton(){
    debugger
    this.productsList.addEventListener('click', (e:any) =>{
      if(e.target.classList.contains('btn-cart')){
        const product = e.target.parentElement

        const inforProduct = {
          quantity: 1,
          title: product.querySelector('.title').textContent,
          price: product.querySelector('.price').textContent
        }

        const exits = this.allproducts.some((product:any) => product.title === inforProduct.title) 

        if(exits){
          const prodycts = this.allproducts.map((product: any) =>{
            if(product.title === inforProduct.title){
              product.quantity++;
              return product
            }else{
              return product
            }
          });
          this.allproducts = [...this.allproducts]
        }else{
          this.allproducts = [...this.allproducts, inforProduct];
        }

        this.showItems();
      }

    });
  }

  menu(){
    this.view = 1
  }

  electronic(){
    this.view = 2
  }

  // Función pintar en el carrito
  showItems(){

    if(this.allproducts.length == 0){
      window.location.reload();
    }

    // Limpiar HTML
    this.rowProduct.innerHTML = '';
    this.total = 0;
    this.totalofProductos = 0;

    this.allproducts.forEach((product:any) => {
       const containerProduct = document.createElement('div');
       containerProduct.classList.add('cart-product');

       containerProduct.innerHTML = `
          <div  class="cart-product" style="display: flex; align-items: center; justify-content: space-between; padding: 7px 30px; border-bottom: 1px solid rgba(250, 247, 247, 0.925);">
            <div class="info-cart-product" style="display: flex; justify-content: space-between; flex: 0.8;">
              <span class="cantidad-producto-carrito" style="font-weight: 400; font-size: 14px; margin: 0px 24px 0px 0px !important; display: flex; align-items: center;">${product.quantity}</span>
              <p class="titulo-producto-carrito" style="font-size: 17px; width: 100%;">${product.title}</p>
              <span class="precio-producto-carrito" style="font-weight: 700;font-size: 14px;margin-left: 10px; display: flex; align-items: center;">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" style="width: 20px; height: 20px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
					</div>
      `
       this.rowProduct.append(containerProduct)
       this.total = this.total + (Number(product.quantity) * Number(product.price));
       this.totalofProductos = this.totalofProductos + product.quantity;
    });

    this.valorTotal.innerText = `${this.total}`
    this.countProducts.innerText = this.totalofProductos
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

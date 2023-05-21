import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  // SERVICIOS PARA OBTENER PRODUCTOS
  obtenerProductos(){
    return this.http.get<any>(`${this.cs.base}products`);
  }

  // SERVICIOS PARA OBTENER LA ALISTA DE LOS PRODUCTOS
  listaCategoriasProductos(){
    return this.http.get<any>(`${this.cs.base}products/categories`);
  }

  // SERVICIOS PARA OBTENER ID DEL PRODUCTO
  idProductos(id:any){
    return this.http.get<any>(`${this.cs.base}products/${id}`);
  }

  // SERVICIOS PARA ELIMINAR UN PRODUCTO
  idDeleteProductos(id:any){
    return this.http.delete<any>(`${this.cs.base}products/${id}`);
  }

}

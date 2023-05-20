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
}

import { Component } from '@angular/core';
import { ProductosService } from './services/producto/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebas_nexos';

  constructor(private servicesProductos: ProductosService){}

  ngOnInit(): void{
    this.servicesProductos.obtenerProductos().toPromise().then(resp =>{
      debugger
      console.log(resp)
    });
  }
}

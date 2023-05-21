import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './docs/index.component';
import { DetalleComponent } from './docs/detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'detalle/:id',
    component: DetalleComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

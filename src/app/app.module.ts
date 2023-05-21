import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './docs/index.component';
import * as jquery from 'jquery';
import { DetalleComponent } from './docs/detalle/detalle.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        DetalleComponent,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        
    ]
})
export class AppModule { }

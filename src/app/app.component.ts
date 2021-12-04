import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExamenUnidad4';

  articulos : any = null ;

  art : any ={
    codigo : [] as any[],
    descripcion:[] as any[],
    precio:[] as any[]
  }

  constructor(private articulosServicio: ArticulosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result => this.articulos = result);
  }

  alta() {
    this.articulosServicio.alta(this.art).subscribe((datos : any ) => {
      if (datos['resultado']) {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  baja(codigo : any) {
    this.articulosServicio.baja(codigo).subscribe((datos : any ) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  modificacion() {
    this.articulosServicio.modificacion(this.art).subscribe((datos : any ) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  seleccionar(codigo : any) {
    this.articulosServicio.seleccionar(codigo).subscribe((result : any ) => this.art = result[0]);
  }

  hayRegistros() {
    return true;
  }
}

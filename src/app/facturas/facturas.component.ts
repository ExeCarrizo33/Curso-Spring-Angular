import {Component, OnInit} from '@angular/core';
import {Factura} from "./models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {flatMap, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FacturaService} from "./services/factura.service";
import {Producto} from "./models/producto";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ItemFactura} from "./models/item-factura";
import swal from "sweetalert2";


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();
  autoCompleteControl = new FormControl('');
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
              private activateRoute: ActivatedRoute,
              private facturaService: FacturaService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    })
    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value["nombre"]),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent) {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any) {
    let cantidad = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItem(id);
    }
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number) {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number) {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItem(id: number) {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm): void {
    console.log(this.factura);
    if (this.factura.items.length == 0) {
      this.autoCompleteControl.setErrors({ 'invalid': true });
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(factura => {
        swal.fire(this.titulo, `Factura ${factura.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/clientes']);
      });
    }
  }


}

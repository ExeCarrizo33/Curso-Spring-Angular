import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente"; // Importa la clase Cliente desde el archivo cliente.ts
import {ClienteService} from "./cliente.service"; // Importa el servicio ClienteService
import {Router, ActivatedRoute} from "@angular/router"; // Importa el enrutador de Angular
import swal from 'sweetalert2'
import {Observable} from "rxjs";
import {Region} from './region';


@Component({
  selector: 'app-form', // Selector CSS que identifica este componente
  templateUrl: 'form.component.html', // Ubicación del archivo HTML asociado a este componente
})
export class FormComponent implements OnInit { // Definición de la clase del componente, implementando OnInit

  public cliente: Cliente = new Cliente(); // Instancia de la clase Cliente, inicializada como un nuevo cliente
  regions: Region[];
  public titulo: string = "Crear Cliente"; // Variable que define el título del formulario

  public errores: string[];

  constructor(private clienteService: ClienteService, // Constructor del componente, inyecta el servicio ClienteService y el enrutador
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente()
    // Método del ciclo de vida del componente, se ejecuta al inicializar el componente
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
    this.clienteService.getRegions().subscribe(regions => this.regions = regions
    )
  }

  create(): void {
    // Método para crear un nuevo cliente
    this.clienteService.create(this.cliente).subscribe( // Llama al método create del servicio ClienteService, pasando el cliente como parámetro
      cliente => {
        this.router.navigate(['/clientes'])
        // @ts-ignore
        swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors)
      }
    );
  }

  update(): void {
    console.log(this.cliente)
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors)
      }
    );
  }

  compareRegion(o1: Region, o2: Region) {
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id
  }

}

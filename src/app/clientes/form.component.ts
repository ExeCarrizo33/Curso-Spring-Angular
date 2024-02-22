import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente"; // Importa la clase Cliente desde el archivo cliente.ts
import {ClienteService} from "./cliente.service"; // Importa el servicio ClienteService
import {Router, ActivatedRoute} from "@angular/router"; // Importa el enrutador de Angular
import swal from 'sweetalert2'
import {Observable} from "rxjs";


@Component({
    selector: 'app-form', // Selector CSS que identifica este componente
    templateUrl: 'form.component.html', // Ubicación del archivo HTML asociado a este componente
})
export class FormComponent implements OnInit { // Definición de la clase del componente, implementando OnInit

    public cliente: Cliente = new Cliente(); // Instancia de la clase Cliente, inicializada como un nuevo cliente
    public titulo: string = "Crear Cliente"; // Variable que define el título del formulario

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
    }

    create(): void {
        // Método para crear un nuevo cliente
        this.clienteService.create(this.cliente).subscribe( // Llama al método create del servicio ClienteService, pasando el cliente como parámetro
            cliente => {
                this.router.navigate(['/clientes'])
                // @ts-ignore
                swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success')
            } // Navega a la ruta '/clientes' después de crear exitosamente el cliente
        );
    }

    update(): void {
        this.clienteService.update(this.cliente).subscribe(
            cliente => {
                this.router.navigate(['/clientes'])
                swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
            }
        )
    }


}

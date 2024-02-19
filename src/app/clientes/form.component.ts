import { Component, OnInit } from '@angular/core';
import { Cliente } from "./cliente"; // Importa la clase Cliente desde el archivo cliente.ts
import { ClienteService } from "./cliente.service"; // Importa el servicio ClienteService
import { Router } from "@angular/router"; // Importa el enrutador de Angular

@Component({
  selector: 'app-form', // Selector CSS que identifica este componente
  templateUrl: 'form.component.html', // Ubicación del archivo HTML asociado a este componente
})
export class FormComponent implements OnInit { // Definición de la clase del componente, implementando OnInit

  public cliente: Cliente = new Cliente(); // Instancia de la clase Cliente, inicializada como un nuevo cliente
  public titulo:string = "Crear Cliente"; // Variable que define el título del formulario

  constructor(private clienteService: ClienteService, // Constructor del componente, inyecta el servicio ClienteService y el enrutador
              private router: Router) {
  }

  ngOnInit() {
    // Método del ciclo de vida del componente, se ejecuta al inicializar el componente
  }

  public create(): void {
    // Método para crear un nuevo cliente
    this.clienteService.create(this.cliente).subscribe( // Llama al método create del servicio ClienteService, pasando el cliente como parámetro
      response => this.router.navigate(['/clientes']) // Navega a la ruta '/clientes' después de crear exitosamente el cliente
    )
  }
}

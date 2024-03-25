import {Component, Input, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ModalService} from "./modal.service";
import swal from "sweetalert2";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  @Input()cliente: Cliente;
  titulo: string = "Detalle del Cliente"
  fotoSeleccionada: File;
  progreso: number = 0;


  constructor(private clienteService: ClienteService,
              public modalService: ModalService) {

  }

  ngOnInit() {

  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image')) {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser de tipo imagen', 'error');
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          // @ts-ignore
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            swal.fire('La foto se ha subido completamente!', response.mensaje, 'success')
          }
        });
    }
  }

  cerrarModal(){
    this.modalService.closeModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}

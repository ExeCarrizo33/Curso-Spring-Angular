import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {ClienteService} from "./cliente.service";
import {ModalService} from "./detail/modal.service";
import {tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../users/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {authGuard} from "../users/guards/auth.guard";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador: any;
  clienteSeleccionado: Cliente;
  token: string;


  constructor(private clienteService: ClienteService,
              private modalService: ModalService,
              private authService: AuthService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.handlerLogin();
    this.activateRoute.paramMap.subscribe(params => {
        let page: number = +params.get('page');
        if (!page) {
          page = 0;
        }
        this.clienteService.getClientes(page).pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.nombre);
            });
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;

        });
      }
    );



    this.modalService.notifyUpload.subscribe(cliente => {
      this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })


  }


  handlerLogin() {
    this.modalService.handlerLoginEventEmitter.subscribe(({username, password})=> {
      console.log(username+' '+password);

      this.authService.login({username,password}).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);
          const user = { username: payload.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }
          console.log(payload);
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/clientes/page/0']);
        },
        error: error => {
          if (error.status == 401){
            console.log(error.error)
            Swal.fire('Error en el Login','Username o password invalidos!','error');
          }else {
            throw error;
          }
        }
      })
    })
  }
  delete(cliente: Cliente):
    void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estás seguro?",
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire({
              title: "Cliente Eliminado!",
              text: `Cliente ${cliente.nombre} eliminado con éxito!.`,
              icon: "success"
            });
          }
        )
      }
    });
  }


  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.openModal()
  }

  get admin(){
    return this.authService.isAdmin();
  }

  get authenticated(){
    return this.authService.authenticated();
  }



}



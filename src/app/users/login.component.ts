import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {ModalService} from "../clientes/detail/modal.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent{

  titulo: String = "Por Favor Inicie Sesión";
  user: User;

  constructor(private modalService: ModalService,
              private router: Router) {
    this.user = new User()
  }


  login(){
    if (!this.user.username || !this.user.password) {
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos!',
        'error'
      );
    } else {
      this.modalService.handlerLoginEventEmitter.emit({ username: this.user.username, password: this.user.password });
    }
  }

}

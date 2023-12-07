import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderModule} from "./header.module";

@Component({
  selector: 'app-root', //indica el contenido dinamico de la pagina
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bienvenido a Angular';
  curso = 'Curso Spring 5 Con Angular 7';
  profesor = 'Andres Guzman';
}


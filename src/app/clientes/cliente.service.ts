import { Injectable } from '@angular/core';
import { CLIENTES } from "./clientes.json"; // Importa el listado de clientes desde un archivo JSON
import { Cliente } from "./cliente"; // Importa el modelo Cliente
import { Observable, of } from "rxjs"; // Importa Observable y of de RxJS
import { HttpClient } from "@angular/common/http"; // Importa HttpClient de Angular para realizar solicitudes HTTP
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes'; // URL del punto final de la API para clientes

  constructor(private http: HttpClient) { } // Constructor que inyecta HttpClient

  // Método para obtener la lista de clientes
  getClientes(): Observable<Cliente[]> {
    // Se puede obtener la lista de clientes de un array local (CLIENTES) o desde una API
    // return of(CLIENTES); // Retorna un observable con la lista de clientes local (para pruebas)
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map((response) => response as Cliente[]) // Utiliza el operador map para transformar la respuesta en un array de Clientes
    ); // Retorna un observable con la lista de clientes desde la API
  }
}

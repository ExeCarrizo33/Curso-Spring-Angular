import {Injectable} from '@angular/core';
import {formatDate, DatePipe} from "@angular/common";
import {Cliente} from "./cliente"; // Importa el modelo Cliente
import {Observable, of, throwError} from "rxjs"; // Importa Observable y of de RxJS
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http"; // Importa HttpClient de Angular para realizar solicitudes HTTP
import {map, catchError, tap} from "rxjs/operators";
import swal from "sweetalert2"; // Importa el operador map de RxJS para transformar datos

import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root' // Define que este servicio se proveerá en el ámbito de toda la aplicación
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes'; // URL del punto final de la API para clientes
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); // Encabezados HTTP JSON

  constructor(private http: HttpClient, private router: Router) {
  } // Constructor que inyecta HttpClient para realizar solicitudes HTTP

  // Método para obtener la lista de clientes desde el backend
  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe( // Realiza una solicitud GET al servidor usando HttpClient
      tap((response: any) => {

        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre)
        })
      }),
      map((response: any) => {

          (response.content as Cliente[]).map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();

            // let datePipe = new DatePipe('es');
            //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy'); //formatDate(cliente.createAt,'dd-MM-yyyy','en-US')

            return cliente;
          });
          return response;
        }
      ),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre)
        })
      }),
    );
  }

  // Método para crear un nuevo cliente en el backend
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );// Realiza una solicitud POST al servidor para crear un nuevo cliente
  }

  getCliente(id): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error')
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  subirFoto(archivo: File, id) :Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}

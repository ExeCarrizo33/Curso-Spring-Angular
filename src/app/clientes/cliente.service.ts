import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Cliente } from "./cliente"; // Importa el modelo Cliente
import { Observable, of, throwError } from "rxjs"; // Importa Observable y of de RxJS
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http"; // Importa HttpClient de Angular para realizar solicitudes HTTP
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2"; // Importa SweetAlert2 para mostrar alertas

import { Router } from '@angular/router';
import { Region } from "./region";
import { AuthService } from "../users/auth.service";

@Injectable({
  providedIn: 'root' // Define que este servicio se proveerá en el ámbito de toda la aplicación
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes'; // URL del punto final de la API para clientes

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { } // Constructor que inyecta HttpClient para realizar solicitudes HTTP

  private agregarAutorizacion() {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.token}`);
    return { headers: httpHeaders };
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions',this.agregarAutorizacion()).pipe(
      catchError(e => {
        console.error('Error obteniendo regiones', e);
        swal.fire('Error', 'No se pudieron obtener las regiones.', 'error');
        return throwError(() => e);
      })
    );
  }

  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      catchError(e => {
        console.error('Error obteniendo clientes', e);
        swal.fire('Error', 'No se pudieron obtener los clientes.', 'error');
        return throwError(() => e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, this.agregarAutorizacion()).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        console.error('Error creando cliente', e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getCliente(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}`, this.agregarAutorizacion()).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error('Error obteniendo cliente', e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, this.agregarAutorizacion()).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        console.error('Error actualizando cliente', e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, this.agregarAutorizacion()).pipe(
      catchError(e => {
        console.error('Error eliminando cliente', e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id: number): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id.toString());
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`)
    });
    return this.http.request(req).pipe(
      catchError(e => {
        console.error('Error subiendo foto', e);
        swal.fire('Error', 'No se pudo subir la foto.', 'error');
        return throwError(() => e);
      })
    );
  }
}

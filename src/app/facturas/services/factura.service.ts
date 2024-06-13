import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Factura} from "../models/factura";
import {Producto} from "../models/producto";
import {AuthService} from "../../users/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint:string = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  private agregarAutorizacion() {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.token}`);
    return { headers: httpHeaders };
  }

  getFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`, this.agregarAutorizacion());
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, this.agregarAutorizacion())
  }

  filtrarProductos(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`, this.agregarAutorizacion())
  }

  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(this.urlEndPoint,factura, this.agregarAutorizacion());
  }
}

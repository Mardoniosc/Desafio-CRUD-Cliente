import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiPath: string = 'api/clientes'

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToClientes));
  }
getById(id: number): Observable<Cliente> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCliente));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.apiPath, cliente)
      .pipe(catchError(this.handleError), map(this.jsonDataToCliente));
  }

  update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiPath}/${cliente.id}`;
    return this.http.put(url, cliente).pipe(
      catchError(this.handleError),
      map(() => cliente)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // PRIVATE METHODS
  private jsonDataToClientes(jsonData: any[]): Cliente[] {
    const clientes: Cliente[] = [];
    jsonData.forEach((element) => clientes.push(element as Cliente));
    return clientes;
  }

  private jsonDataToCliente(jsonData: any[]): Cliente {
    return jsonData as Cliente;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }
}

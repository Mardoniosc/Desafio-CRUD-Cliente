import { Injectable } from '@angular/core';
import { Cliente } from "../models/cliente.model";
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiPath: string = 'api/clientes';

  constructor() {}
}

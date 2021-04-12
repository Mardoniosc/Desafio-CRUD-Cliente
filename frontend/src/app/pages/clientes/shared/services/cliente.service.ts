import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Cliente } from '../models/cliente.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends BaseResourceService<Cliente> {
  constructor(protected injector: Injector) {
    super(`${env.baseUrl}clientes`, injector);
  }
}

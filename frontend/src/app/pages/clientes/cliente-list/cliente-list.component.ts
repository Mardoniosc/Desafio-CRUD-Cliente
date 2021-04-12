import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';
import { ClienteService } from '../shared/services/cliente.service';
import toastr from 'toastr';
import { DadosUserLogado } from 'src/app/shared/models/dados-user-logado.mode';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(
      (data) => (this.clientes = data),
      (err) => {
        if(err.status === 403) {
          toastr.error('Acesso Negado', 'Erro ' + err.status)
        } else {
          toastr.error(err.error.message, 'Erro ' + err.status);
        }
      }
    );
  }

  deleteCliente(cliente: Cliente) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.clienteService.delete(cliente.id).subscribe(
        (data) => {
          this.clientes = this.clientes.filter((x) => x != cliente);
        },
        (err) => {
          if(err.status == 403) {
            toastr.error('Acesso Negado', 'Erro ' + err.status)
          } else {
            toastr.error(err.error.message, 'Erro ' + err.status);
          }
        }
      );
    }
  }
}

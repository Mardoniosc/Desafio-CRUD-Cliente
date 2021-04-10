import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(
      (data) => (this.clientes = data),
      (err) => console.error('Erro ao carregar clientes', err)
    );
  }

  deleteCliente(cliente: Cliente) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.clienteService.delete(cliente.id).subscribe(
        (data) => {
          this.clientes = this.clientes.filter((x) => x != cliente);
        },
        (err) => alert('Erro ao tentar excluir!!')
      );
    }
  }
}

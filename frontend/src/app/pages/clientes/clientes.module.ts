import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { CpfPipe } from 'src/app/core/pipes/cpf.pipe';
import { CepPipe } from 'src/app/core/pipes/cep.pipe';
import { TelefonePipe } from 'src/app/core/pipes/telefone.pipe';
@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent,

    //Pipe
    CpfPipe,
    CepPipe,
    TelefonePipe
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
  ],

  providers: [
    CpfPipe, CepPipe, TelefonePipe
  ]
})
export class ClientesModule { }

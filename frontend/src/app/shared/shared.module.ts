import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TelefonePipe } from '../core/pipes/telefone.pipe';
import { CepPipe } from '../core/pipes/cep.pipe';
import { CpfPipe } from '../core/pipes/cpf.pipe';

@NgModule({
  declarations: [CpfPipe, CepPipe, TelefonePipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, CpfPipe, CepPipe, TelefonePipe],
  providers: [CpfPipe, CepPipe, TelefonePipe]
})
export class SharedModule {}

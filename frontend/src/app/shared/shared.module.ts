import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TelefonePipe } from '../core/pipes/telefone.pipe';
import { CepPipe } from '../core/pipes/cep.pipe';
import { CpfPipe } from '../core/pipes/cpf.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [CpfPipe, CepPipe, TelefonePipe],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [CommonModule, ReactiveFormsModule, CpfPipe, CepPipe, TelefonePipe],
  providers: [CpfPipe, CepPipe, TelefonePipe, AuthGuard]
})
export class SharedModule {}

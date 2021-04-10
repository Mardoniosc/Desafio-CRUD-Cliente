import { Endereco } from './endereco.model';

export class Cliente {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public enderecos?: Endereco[],
    public telefones?: string[],
    public emails?: string[]
  ) {}
}

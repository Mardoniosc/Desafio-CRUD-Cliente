import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Cliente } from '../shared/models/cliente.model';
import { Endereco } from '../shared/models/endereco.model';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  currentAction: string;
  clienteForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  cliente: Cliente = new Cliente();
  endereco: Endereco;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildClienteForm();
    this.loadCliente();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createCliente();
    } else {
      this.updateCliente();
    }
  }

  // PRIVATE METHODS

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildClienteForm() {
    this.clienteForm = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      cpf: [null, [Validators.required]],
      telefones: [null, Validators.required],
      emails: [null, Validators.required],
      enderecos: this.formBuilder.array([
        this.formBuilder.group({
          id: [null],
          logradouro: [null, Validators.required],
          numero: [null, Validators.required],
          complemento: [null],
          bairro: [null, Validators.required],
          cep: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
        }),
      ]),
    });
  }

  private loadCliente() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((parms) =>
            this.clienteService.getById(Number(parms.get('id')))
          )
        )
        .subscribe(
          (data) => {
            this.cliente = data;
            this.clienteForm.patchValue(this.cliente);
          },
          (err) => console.error('Erro ao carregar a cliente', err)
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Novo Cliente';
    } else {
      const clienteName = this.cliente.nome || '';
      this.pageTitle = 'Editando cliente: ' + clienteName;
    }
  }

  private createCliente() {
    const cliente: Cliente = Object.assign(
      new Cliente(),
      this.clienteForm.value
    );

    this.clienteService.create(cliente).subscribe(
      (cliente) => this.actionForSuccess(cliente),
      (err) => this.actionForError(err)
    );
  }

  private updateCliente() {
    const cliente: Cliente = Object.assign(
      new Cliente(),
      this.clienteForm.value
    );

    this.clienteService.update(cliente).subscribe(
      (cliente) => this.actionForSuccess(cliente),
      (err) => this.actionForError(err)
    );
  }

  private actionForSuccess(cliente: Cliente) {
    toastr.success('Solicitação processada com sucesso!');

    this.router
      .navigateByUrl('clientes', { skipLocationChange: true })
      .then(() => this.router.navigate(['clientes', cliente.id, 'edit']));
  }

  private actionForError(err) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if (err.status === 422) {
      this.serverErrorMessages = JSON.parse(err._body).erros;
    } else {
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. Favor tente mais tarde!',
      ];
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {

  oportunidade = {};
  oportunidades = [];

  constructor(
    private oportunidadeService: OportunidadeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.oportunidadeService.listar()
      .subscribe(resposta => this.oportunidades = <any>resposta);
  }

  adicionar(oportunidade) {

    if (oportunidade.id) {
      this.confirmationService.confirm({
        message: 'Você tem certeza que deseja atualizar este item?',
        accept: () => {
          this.oportunidadeService.salvar(this.oportunidade)
            .subscribe(() => {
              this.oportunidade = {};
              this.consultar();
              this.messageService.add({
                severity: 'success',
                summary: 'Oportunidade atualizada com sucesso!'
              });
            },
              resposta => this.showError(resposta))
        },
        reject: () => {
          this.consultar();
        }
      })
    } else {
      this.oportunidadeService.salvar(this.oportunidade)
        .subscribe(() => {
          this.oportunidade = {};
          this.consultar();
          this.messageService.add({
            severity: 'success',
            summary: 'Oportunidade salva com sucesso!'
          });
        },
          resposta => this.showError(resposta));
    }

  }

  showError(resposta) {
    let msg = "Erro inesperado. Verifique os dados e tente novamente";

    if (resposta.error.error) {
      msg = resposta.error.error
    }

    this.messageService.add({
      severity: 'error',
      summary: msg
    });
  }

  deletar(item) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja remover este item?',
      accept: () => {
        this.oportunidadeService.deletar(item.id).subscribe(() => {
          this.consultar(),
            this.messageService.add({
              severity: 'success',
              summary: 'Oportunidade deletada com sucesso!'
            })
        });
      }
    });
  };

  update(item) {    
    this.oportunidade = item;
  }

}

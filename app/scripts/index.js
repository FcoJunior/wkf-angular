'use strict';

class Aluno {
  constructor(nome, idade) {
    this._nome = nome;
    this._idade = idade;
  }

  get nome() {
    return this._nome;
  }

  get idade() {
    return this._idade;
  }
}

let aluno = new Aluno('Junior', 22);

alert(aluno.nome + ' - ' + aluno.idade);

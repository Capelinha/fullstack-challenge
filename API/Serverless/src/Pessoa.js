const { attributes } = require('structure');

const Pessoa = attributes({
  id: {
    type: String,
    required: false
  },
  nome: {
    type: String,
    minLength: 1,
    required: true
  },
  sobrenome: {
    type: String,
    minLength: 1,
    required: true
  },
  participacao: {
    type: Number,
    integer: true,
    required: true
  }
})(class Pessoa { });

// const pessoa = new Pessoa({
//   nome: 'Mateus',
//   sobrenome: 'Igreja',
//   participacao: 10
// });
//
// const { valid, errors } = pessoa.validate();

module.exports = Pessoa;

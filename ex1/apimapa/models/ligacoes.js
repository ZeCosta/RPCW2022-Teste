const mongoose = require('mongoose')

var ligacoesSchema = new mongoose.Schema({
    id: String,
    origem: String,
    destino: String,
    distância: Number,

  });

module.exports = mongoose.model('ligacoes', ligacoesSchema)
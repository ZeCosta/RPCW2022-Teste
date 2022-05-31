var Ligacoes = require('../models/ligacoes')


module.exports.listar_por_origem = (o) => {
    return Ligacoes
        .find({origem: o},{_id:0, id: 1, destino: 1})
        .exec()
}

module.exports.listar_por_dist = (d) => {
    return Ligacoes
        .find({distância: { $gte: d}},{_id:0, id: 1, origem: 1, destino: 1})
        .exec()
}
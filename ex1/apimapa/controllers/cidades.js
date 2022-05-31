var Cidades = require('../models/cidades')


module.exports.listar = () => {
    return Cidades
        .find({},{_id:0, id: 1, nome: 1, distrito: 1})
        .exec()
}

module.exports.consultar = id => {
    return Cidades
        .findOne({id: id})
        .exec()
}


module.exports.listar_nomes = () => {
    return Cidades
        .find({},{_id:0, nome: 1})
        .sort('nome')
        .exec()
}

module.exports.listar_por_distrito = (d) => {
    return Cidades
        .find({distrito: d})
        .exec()
}
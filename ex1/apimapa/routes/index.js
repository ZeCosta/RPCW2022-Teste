var express = require('express');
var router = express.Router();
var Cidades = require('../controllers/cidades')
var Ligacoes = require('../controllers/ligacoes')


/*
GET /api/distritos - Devolve uma lista de distritos em que para cada distrito apresenta os campos: nome do distrito e lista de cidades pertencentes ao distrito (apenas id e nome de cada cidade).

GET /api/ligacoes?origem=XX - Devolve a lista de ligações que têm a cidade XX como origem, a lista deverá ter os seguintes campos: id da ligação, id da cidade destino, nome da cidade destino;
GET /api/ligacoes?dist=YY - Devolve a lista de ligações que têm uma distância maior ou igual a YY, a lista deverá ter os seguintes campos: id da ligação, id da cidade origem, nome da cidade origem, id da cidade destino e nome da cidade destino.
*/
router.get('/api/cidades', function(req, res, next) {
  distrito=req.query.distrito
  console.log(distrito)
  if(!(distrito===undefined)){
    Cidades.listar_por_distrito(distrito)
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(error => {
        res.status(501).jsonp({erro:error})
      })
  }

  else{
    Cidades.listar()
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(error => {
        res.status(502).jsonp({erro:error})
      })
  }
});


router.get('/api/cidades/nomes', function(req, res, next) {
  Cidades.listar_nomes()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(error => {
      res.status(503).jsonp({erro:error})
    })
});


router.get('/api/cidades/:id', function(req, res, next) {
  Cidades.consultar(req.params.id)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(error => {
      res.status(504).jsonp({erro:error})
    })
});

/*
[
  {
    Porto:[{
      id: a,
      nome:blah,
    },
    ...]
  },
  {
    Braga:[
      ...
    ]
  }
]*/

router.get('/api/distritos', function(req, res, next) {
  Cidades.listar()
    .then(lista => {
      var resp = []
      var distr = {}

      lista.forEach(cid => {
        if(!(cid.distrito in distr)){
          distr[cid.distrito] = []
        }
        distr[cid.distrito].push({
          "id":cid.id,
          "nome":cid.nome
        })       
      })

      for(key in distr){
        resp.push({
          "distrito": key,
          "listaCidades": distr[key]
        })
      }
      res.status(200).jsonp(resp)
        
    })
    .catch(error => {
      res.status(505).jsonp({erro:error})
    })
});



function getnome(id,list){
  ret=""
  list.forEach(l => {
    if(l.id==id)
      ret=l.nome
  })
  return ret
}
router.get('/api/ligacoes', function(req, res, next) {
  origem=req.query.origem
  dist=req.query.dist
  console.log(origem+" ou "+dist)

  if(!(origem===undefined)){
    Ligacoes.listar_por_origem(origem)
      .then(dados => {

        Cidades.listar()
          .then(cidades => {
            console.log(cidades)
            var ret=[]

            dados.forEach(elem => {
              nome=getnome(elem.destino,cidades)
              console.log(nome)
              ret.push({
                "id":elem.id,
                "destino":elem.destino,
                "nome_destino":nome
              })
            })


            res.status(200).jsonp(ret)
          })
          .catch(error => {
            res.status(506).jsonp({erro:error})
          })

      })
      .catch(error => {
        res.status(507).jsonp({erro:error})
      })
  }



  else if(!(dist===undefined)){
    Ligacoes.listar_por_dist(dist)
      .then(dados => {

        Cidades.listar()
          .then(cidades => {
            var ret=[]
            dados.forEach(elem => {
              nome1=getnome(elem.origem,cidades)
              nome2=getnome(elem.destino,cidades)
              ret.push({
                "id":elem.id,
                "origem":elem.origem,
                "nome_origem":nome1,
                "destino":elem.destino,
                "nome_destino":nome2
              })
            })

            res.status(200).jsonp(ret)
          })
          .catch(error => {
            res.status(508).jsonp({erro:error})
          })

      })
      .catch(error => {
        res.status(509).jsonp({erro:error})
      })
  }
  else{
    res.status(200).jsonp({})
  }
});

module.exports = router;
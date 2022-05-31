var express = require('express');
var router = express.Router();
const axios = require("axios")

var token=""
var username="rpcw2022@gmail.com"
var password="2022"
axios.post('http://clav-api.di.uminho.pt/v2/users/login',{
    "username": username,
    "password": password,
    })
    .then(resp => {
      console.log(resp.data);
      token=resp.data.token
    })
    .catch(error => {
        console.log(error);
    });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('index');  
});


router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?token="+token)
    .then(response => {
      var lista = response.data
      res.status(200).render('classes', { lista: lista});  
    })
    .catch(function(erro){
      res.status(501).jsonp({erro: erro});
    })
});

router.get('/classes/:id', function(req, res, next) {
  id=req.params.id
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+id+"?token="+token)
    .then(response => {
      var c = response.data
      res.status(200).render('classe', { classe: c});  
    })
    .catch((erro) => {
      res.status(502).render('error', { erro: erro});  
    })
});
module.exports = router;



router.get('/termosIndice', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token="+token)
    .then(response => {
      var lista = response.data
      console.log(lista)
      res.status(200).render('termosIndice', { lista: lista});  
    })
    .catch(function(erro){
      res.status(501).jsonp({erro: erro});
    })
});
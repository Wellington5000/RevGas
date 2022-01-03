const express = require('express')
const router = express.Router()
const readLine = require('readline')
const fs = require('fs')
const readAble = fs.createReadStream('bancos.csv')

const connection = require('../model/database')

//LÊ DADOS DO CSV E ADICIONA AO BANCO
function inserirDados() {
    const rl = readLine.createInterface({ input: readAble })
    i = 0
    rl.on('line', (line) => {
        line = line.split(',')
        codigo_compensacao = line[0].replace(/\D+/g, '');
        nome_instituicao = line[1].replace(/"/g, '')
        //Insere csv no banco
        if (i != 0) {
            connection.query("insert into bancos values (?, ?)", [parseInt(codigo_compensacao), nome_instituicao])
        }
        i++
    })
}

//Consultar todos os dados
router.get('/listagem_bancos', (req, res) => {
    connection.query("select * from bancos", (error, result, fields) => {
        res.json(result)
    })
})

//consultar apenas pelo código
router.get('/consultar_codigo/:codigo_compensacao', async (req, res) => {
    var query = `SELECT * FROM BANCOS WHERE CODIGO_COMPENSACAO = ${req.params.codigo_compensacao}`
    connection.query(query, (error, result, fields) => {
        res.json(result)
    })
})

//Consultar por código e nome
router.get('/consultar/:codigo_compensacao/:nome_instituicao', async (req, res) => {
    console.log(req.params)
    var query = `SELECT * FROM BANCOS WHERE CODIGO_COMPENSACAO = ${req.params.codigo_compensacao} AND NOME_INSTITUICAO LIKE '%${req.params.nome_instituicao}%'`
    connection.query(query, (error, result, fields) => {
        res.json(result)
    })
})

//Consultar apenas pelo nome
router.get('/consultar_nome/:nome_instituicao', async (req, res) => {
    var query = `SELECT * FROM BANCOS WHERE NOME_INSTITUICAO LIKE '%${req.params.nome_instituicao}%'`
    connection.query(query, (error, result, fields) => {
        res.json(result)
    })
})

//Inserir novo banco
router.post('/salvar', (req, res) => {
    var query = `INSERT INTO BANCOS VALUES(${req.body.codigo_compensacao}, '${req.body.nome_instituicao}')`
    connection.query(query, (error, result) => {
        res.json(result)
    })
})

//Atualizar  banco existente
router.post('/atualizar', (req, res) => {
    var query = `UPDATE BANCOS SET nome_instituicao = '${req.body.nome_instituicao}' WHERE CODIGO_COMPENSACAO = ${req.body.codigo_compensacao}`
    connection.query(query, (error, result) => {
        console.log(error)
        res.json(result)
    })
})

//Deletar banco
router.post('/deletar', (req, res) => {
    var query = `DELETE FROM BANCOS WHERE codigo_compensacao = ${req.body.codigo_compensacao}`
    connection.query(query, (error, result) => {
        res.json(result)
    })
})

module.exports = router
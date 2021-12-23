const express = require('express')
const app = express()
const readLine = require('readline')
const fs = require('fs')
const readAble = fs.createReadStream('bancos.csv')
const cors = require('cors')
var mysql = require('mysql');
const path = require('path')
const nomeApp = process.env.npm_package_name
app.use(cors())

//CONFIGURA ELEMENTOS ESTÁTICOS DO ANGULAR PARA HOSPEDAGEM
app.use(express.static('./view/dist/view'));
app.get('/', (req, res) =>
    res.sendFile('index.html', {root: 'view/dist/view/'}),
);

//CONECTA COM O BANCO EM NUVEM
const connection = mysql.createConnection({
    host: 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'sz5pnypzyjledxux',
    password: 'xxxws6e395ua71cn',
    database: 'bo5hdz1baoy2wogt'
});

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

//Consulta todos os dados
app.get('/listagem_bancos', (req, res) => {
    connection.query("select * from bancos", (error, result, fields) => {
        res.json(result)
    })
})

//consulta apenas pelo código
app.get('/consultar_codigo/:codigo_compensacao', async (req, res) => {
    var query = `SELECT * FROM BANCOS WHERE CODIGO_COMPENSACAO = ${req.params.codigo_compensacao}`
    connection.query(query, (error, result, fields) => {
        res.json(result)
    })
})

//Consulta por código e nome
app.get('/consultar/:codigo_compensacao/:nome_instituicao', async (req, res) => {
    console.log(req.params)
    var query = `SELECT * FROM BANCOS WHERE CODIGO_COMPENSACAO = ${req.params.codigo_compensacao} AND NOME_INSTITUICAO LIKE '%${req.params.nome_instituicao}%'`
    connection.query(query, (error, result, fields) => {
        res.json(result)
    })
})

//consulta apenas pelo nome
app.get('/consultar_nome/:nome_instituicao', async (req, res) => {
    var query = `SELECT * FROM BANCOS WHERE NOME_INSTITUICAO LIKE '%${req.params.nome_instituicao}%'`
    connection.query(query, (error, result, fields) => {
        res.json(result)
    })
})

app.listen(process.env.PORT || 3000)
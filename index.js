const express = require('express')
const app = express()
const readLine = require('readline')
const fs = require('fs')
const readAble = fs.createReadStream('bancos.csv')
const cors = require('cors')
var mysql = require('mysql');

app.use(cors())

const connection = mysql.createConnection({
    host: 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'sz5pnypzyjledxux',
    password: 'xxxws6e395ua71cn',
    database: 'bo5hdz1baoy2wogt'
});



function inserirDados() {
    const rl = readLine.createInterface({ input: readAble })
    i = 0
    rl.on('line', async (line) => {
        line = line.split(',')
        codigo_compensacao = line[0].replace(/\D+/g, '');
        nome_instituicao = line[1].replace(/"/g, '')
        //Insere csv no banco
        if (i != 0) {
            await connection.query("insert into bancos values (?, ?)", [parseInt(codigo_compensacao), nome_instituicao])
        }
        i++
    })
}

function lerDados(codigo_compensacao, nome_instituicao) {
    connection.query("select * from bancos", [codigo_compensacao, nome_instituicao], (error, result, fields) => {
        console.log(result)
        return result
    })
}

app.get('/', (req, res) => {
    //apagarDados()
    lerDados(1, '')
    //inserirDados()
    res.send('rodou')
})

app.get('/consultar', async (req, res) => {
    connection.query("select * from bancos", (error, result, fields) => {
        console.log(result)
        res.json(result)
    })
    
})

app.listen(3000)
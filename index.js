const express = require('express')
const app = express()
const readLine = require('readline')
const fs = require('fs')
const readAble = fs.createReadStream('bancos.csv')
var mysql = require('mysql');

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

function lerDados(codigo_compensacao, nome_instituicao){
    connection.query("select * from bancos where codigo_compensacao = ? or nome_instituicao like '%?%'", [codigo_compensacao, nome_instituicao], (error, result, fields) => {
        console.log(result)
    })
}




app.use('/', (req, res) => {
    //apagarDados()
    lerDados(1, '')
    //inserirDados()
    res.send('rodou')
})

app.use('/consultar', async (req, res) => [
    
])

app.listen(3000)
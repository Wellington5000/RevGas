const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(cors())

const router = require('./controller/rotas')

//CONFIGURA ELEMENTOS ESTÁTICOS DO ANGULAR PARA HOSPEDAGEM
app.use(express.static('./view/dist/view'));
app.get('/', (req, res) =>
    res.sendFile('index.html', {root: 'view/dist/view/'}),
);

//PERMITE OBTER DADOS DE REQUISIÇÕES POST
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(process.env.PORT || 3000)
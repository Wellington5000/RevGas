const mysql = require('mysql');

//CONECTA COM O BANCO EM NUVEM
const connection = mysql.createConnection({
    host: 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'sz5pnypzyjledxux',
    password: 'xxxws6e395ua71cn',
    database: 'bo5hdz1baoy2wogt'
});

module.exports = connection
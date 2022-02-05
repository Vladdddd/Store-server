const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'store'
})

connection.connect((error) => {
    if(error) {
        return console.log('Error')
    }
    else {
        return console.log('Success')
    }
})

module.exports = connection
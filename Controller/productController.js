'use strict'

const response = require('./../response')
const db = require('./../settings/db')

exports.getProducts = (req, res) => {
    let page = 0;
    if (req.query.page > 1) {
        page = (Number(req.query.page) - 1) * Number(req.query.count)
    }
    const maxPage = req.query.page * req.query.count
    
    if(req.query.city ==="all") {
        db.query('SELECT * FROM `products` where id > ' + page + ' and id <= ' + ' ' + maxPage, (error, rows, fields) => {
            if (error) {
                console.log(error)
            }
            else {
                response.status(rows, res)
            }
        })
    }
    //select * from `products` where city='city'
    else {
        db.query('SELECT * FROM `products` where city="' + req.query.city + '" limit ' + page + ', ' + 4, (error, rows, fields) => {
            if (error) {
                console.log(error)
            }
            else {
                response.status(rows, res)
            }
        })
    }

    
}

exports.getProduct = (req, res) => {
    db.query('SELECT * FROM `products` where id=' + req.query.id, (error, rows, fields) => {
        if (error) {
            console.log(error)
        }
        else {
            response.status(rows, res)
        }
    })
}

exports.addOrder = (req, res) => {

    const values = "('"+req.body.name+"', '"+req.body.secondName+"', '"+req.body.city+"', '"+req.body.address+"', '"+req.body.phone+"', '"+req.body.email+"' , '"+req.body.cartProducts+"', '"+req.body.totalPrice+"')"
    const sql = "INSERT INTO `orders`(`name`, `second_name`, `city`, `address`, `phone`, `email`, `products`, `total_price`) VALUES" + values

    db.query(sql, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }
    })
}

exports.getProductsCount = (req, res) => {
    let sql = "SELECT COUNT(1) FROM `products`"
    if(req.query.city !== 'all') {
        sql += " WHERE city='" + req.query.city + "'"
    }

    db.query(sql, (error, results) => {
        if(error) {
            console.log(error)
            
        }
        else {
            response.status(results, res)
        }
    })
}

exports.getSearchedProducts = (req, res) => {
    let sql = "SELECT * FROM `products` where name like '%" + req.query.name + "%'"
    db.query(sql, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }

    })
}
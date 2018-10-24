const express = require("express");
const router = express.Router();
const connection = require('./../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const sql = `INSERT INTO users(name, email, password) 
                VALUES('${req.body.name}','${req.body.email}', '${hash}')`;
            connection.query(sql, (err, res1) => {
                if (err) { throw err };
                res.json({
                    message: "success"
                })
            })
        }) 
})

router.post("/login", (req, res) => {
    console.log(req.body)
    const sql = `SELECT * FROM users WHERE email='${req.body.email}'`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        if(rows.length == 0){
            return res.status(401).json({
                message: "authentication unsuccessful",
                err: "No such user exists, try registering first"
            })
        }
        else{
            bcrypt.compare(req.body.password, rows[0].password).then(
                (bool) => {
                    if(!bool){
                        return res.status(401).json({
                            message: "authentication unsuccessful",
                            err: "Wrong password"
                        })
                    }
                    let token = jwt.sign(
                        {"user_id":rows[0].id, "name":rows[0].name, "email":rows[0].email},
                        "my_secret_key", {expiresIn: "1h"});
                    res.status(201).json({
                        message: "authentication successful",
                        token:token,
                        expiresIn: 3600
                    })
                }
            )
            .catch(err => {
                return res.status(401).json({
                    message:"Authentication failed"
                })
            })
        }
        console.log(rows.length, rows[0]);
    });
})

router.all('*', (req, res) => {
    res.json({ message: 'Bad request' });
})

module.exports = router;
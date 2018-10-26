const express = require("express");
const router = express.Router();
const connection = require('./../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('./../mailer');

router.post('/signup', (req, res) => {
    const sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    connection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: "Error occured while executing databse query."
            });
        };
        if(rows.length){
            return res.status(401).json({
                message: "There is already a user with this email, do you want to login?"
            });
        }
    })
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const sql = `INSERT INTO users(name, email, password) 
                VALUES('${req.body.name}','${req.body.email}', '${hash}')`;
            connection.query(sql, (err, res1) => {
                if (err) { 
                    return res.status(500).json({
                        message : "Error occured while executing databse query."
                    });
                };
                const code = Math.floor(10000 + Math.random() * 90000);
                const sql = `UPDATE users SET code = ${code} WHERE email='${req.body.email}'`;
                connection.query(sql, (err, res1) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Error occured while executing databse query."
                            });
                        };
                    sendMail(
                        "arpit@banati.in",
                        'Confirm your registration',
                        `Please enter the following code to confirm your registration for Notes App \n ${code}`);
                    res.status(200).json({
                        status:"success",
                        message: "Registration successful."
                    })
                })
            })
        }) 
})

router.patch('/confirmCode', (req, res) => {
    const sql = `UPDATE users SET code=0 WHERE code=${req.body.code} AND email='${req.body.email}'`;
    connection.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Error occured while executing databse query."
            });
        };
        if(rows.affectedRows == 1){
            return res.status(200).json({
                status: "success",
                message: "Email confirmed, you can login now."
            })
        }
        else{
            return res.status(400).json({
                err: "code error",
                message: "Please enter the correct sent to your email"
            })
        }
    })
})

router.post("/login", (req, res) => {
    const sql = `SELECT * FROM users WHERE email='${req.body.email}'`;
    connection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: "Error occured while executing databse query."
            });
        };
        if(rows.length == 0){
            return res.status(401).json({
                message: "No such user exists, try registering first",
                err: "authentication unsuccessful "
            })
        }
        else{
            bcrypt.compare(req.body.password, rows[0].password).then(
                (bool) => {
                    if(!bool){
                        return res.status(401).json({
                            message: "Wrong password",
                            err: "authentication unsuccessful"
                        })
                    }
                    let token = jwt.sign(
                        {"user_id":rows[0].id, "name":rows[0].name, "email":rows[0].email},
                        "my_secret_key", {expiresIn: "1h"});
                    res.status(201).json({
                        message: "Login successful",
                        status: "success",
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
    });
})

router.patch('/forgotPassword', (req, res) => {
    let uuid = randomString();
    const sql = `UPDATE users SET forgot_password='${uuid}' WHERE email='${req.body.email}'`;
    connection.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Error occured while executing databse query."
            });
        };
        if (rows.affectedRows == 1) {
            sendMail(
                "arpit@banati.in",
                'Reset Password',
                `Please enter the following code to reset your password for Notes App \n ${uuid}`);
            return res.status(200).json({
                status: "success",
                message: "Enter new password"
            })
        }
        else {
            return res.status(400).json({
                err: "email error",
                message: "This email does not exist, please check the details."
            })
        }
    })
})

router.patch('/resetPassword', (req, res) => {
    if(req.body.password !== req.body.password1){
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }
    
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const sql = `UPDATE users SET password='${hash}', forgot_password="" 
            WHERE email='${req.body.email}' AND forgot_password='${req.body.uuid}'`;
            connection.query(sql, (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error occured while executing databse query."
                    });
                };
                if (rows.affectedRows == 1) {
                    res.status(200).json({
                        status: "success",
                        message: "Password reset successful."
                    })
                }
                else{
                    res.status(500).json({
                        status: "error",
                        message: "There was a problem, please try again later."
                    })
                }
            })
        })
})

router.all('*', (req, res) => {
    res.json({ message: 'Bad request' });
})

function sendMail(receiver, subject, text){
    let mailOptions = {
        from: 'arpitbanati97@gmail.com',
        to: receiver,
        subject: subject,
        text: text
    };

    mailer.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// function reportError(){

// }

function randomString(){
    const str = Math.random().toString(36).substring(2, 12)
    + Math.random().toString(36).substring(2, 12);
    return str;
}

module.exports = router;
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "banatidb.cds2cmlxrnwe.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "arpitbanati",
    password: "support123",
    database: "banatidb"
});

connection.connect(function (err) {
    if (err) {
        res.status(500).json({
            message: "Error connecting to database."
        });
    };
    console.log("Connected!");
});

module.exports = connection;

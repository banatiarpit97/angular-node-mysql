const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "notes"
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

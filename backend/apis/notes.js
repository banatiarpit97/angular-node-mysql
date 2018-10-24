const express = require("express");
const router = express.Router();
const connection = require('./../mysql');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})

router.get('/', checkAuth, (req, res) => {
    let count;
    connection.query("SELECT COUNT(*) MAX FROM notes WHERE user_id=1", (req1, result) => {
        count = result;
        const sql = `SELECT * FROM notes WHERE user_id=1 LIMIT ${req.query.offset}, ${req.query.pageSize}`;        
        connection.query(sql, (req2, rows) => {
            res.json({
                message: 'success',
                body: rows,
                count : count[0]
            });
        })
    })
    
    
})

router.post('/', checkAuth, multer({storage:storage}).single('image'), (req, res) => {
    let imgName;
    if(req.file){
        imgName = req.file.filename;
    }
    else{
        imgName = "";
    }
    let sql = `INSERT INTO notes(user_id, title, value, image, date_time) VALUES 
                (${req.body.user_id},'${req.body.title}',
                '${req.body.noteValue}', '${imgName}','${req.body.date_time}')`;


    connection.query(sql, (err, result) => {
        if(err){throw err};
        res.json({ 
            message: 'success', 
            body: {
                title: req.body.title,
                value: req.body.noteValue,
                image: imgName,
                date_time: req.body.date_time

            } 
        });
    })
})

router.patch('/:id', checkAuth, multer({ storage: storage }).single('image'), (req, res) => {
    let imgName;
    let sql;
    if(req.file){
        imgName = req.file.filename;
        sql = `UPDATE notes SET title='${req.body.title}',
            value='${req.body.noteValue}', image='${req.file.filename}',
            date_time='${req.body.date_time}'
            WHERE id=${req.params.id}`;
    }
    else{
        imgName = "";
        sql = `UPDATE notes SET title='${req.body.title}',
            value='${req.body.noteValue}', date_time='${req.body.date_time}'
            WHERE id=${req.params.id}`;
    }
    
    connection.query(sql, (err, result) => {
        if (err) { throw err };
        res.json({
            message: 'success',
            body: {
                title: req.body.title,
                value: req.body.noteValue,
                image: imgName,
                date_time: req.body.date_time
            }
        });
    })
})

router.delete('/:id', checkAuth, (req, res) => {
    const sql = `DELETE FROM notes WHERE id = '${req.params.id}'`;
    connection.query(sql, (err, result) => {
        if (err) { throw err };
        res.json({ message: 'success'});
    })
})

router.all('*', (req, res) => {
    res.json({ message: 'Bad request' });
})

module.exports = router;
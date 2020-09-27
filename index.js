const mysql = require('mysql');
const express = require('express');
const app = express();

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('MySQL connected');
    }
});

// Create Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send('Database created...')
        }
        console.log(result);
    });
});

// Create Table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE tableapp(id int AUTO_INCREMENT, title VARCHAR (255), body VARCHAR (255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('tableapp table created...');
    });
});

// Insert table 1
app.get('/addtable1', (req, res) => {
    let post = {
        title: 'Table One',
        body: 'This is table numebr one'
    };
    let sql = 'INSERT INTO tableapp SET ?' //? adalah placeholder untuk data dari post
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Insert table 2
app.get('/addtable2', (req, res) => {
    let post = {
        title: 'Table Two',
        body: 'This is table number two'
    };
    let sql = 'INSERT INTO tableapp SET ?' //? adalah placeholder untuk data dari post
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post two added...');
    });
});

// Select Post
app.get('/gettable', (req, res) => {
    let sql = 'SELECT * FROM tableapp'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send(results);
    });
});

// Select Individual
app.get('/getsingletable/:id', (req, res) => {
    let sql = `SELECT * FROM tableapp WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

// Update Table //Cara memunculkan menggunakan select individual
app.get('/updatetable/:id', (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `UPDATE tableapp SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Delete Table
app.get('/deletetable/:id', (req, res) => {
    let sql = `DELETE FROM tableapp WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express;

const port = 8080;

const db = mysql.createConnection({
    host: '192.168.133.173',
    user: 'testuser',
    password: '1q2w3e',
    database: 'testdb'
});


db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
})


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const value = req.body.inputValue;
    const query = 'insert into test (value) VALUES (?)'

    db.query(query, [value], (err, result) => {
        if (err) {
            console.log('Error saving data:', err);
            res.status(500).send('Error saving data');
            return;
        }
        res.send('Data saved successfully');
    });
});

app.listen(port, () => {
    console.log('Server running on http://192.168.133.172:${port}')
});
// Import required packages
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(
    express.static(__dirname + '/public'),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    cors()
);

const port = process.env.PORT || 8080;

// Database credentials
const dbHost = 'localhost';
const dbName = 'lab2login';
const dbUser = 'root';
const dbPass = 'root';

// Connect to MySQL
const con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPass
});


con.connect(err => {
    if (err) throw err;
    console.log('MySQL connected !');

    // Select Database
    con.changeUser({database: dbName}, function (err) {
        if (err) throw err;
        console.log('Database changed to ' + dbName);
    });
});

app.get('/api/v1/measurement', (req, res) => {
    let sql = `
            SELECT
                *
            FROM
              measurement
            ORDER BY id DESC
            `;
    con.query(sql, (err, measurement) => {
        if (err) throw err;
        let sum = 0;

        Object.keys(measurement).slice(0, 5).forEach( key => {
            console.log(measurement[key].temperature);
            sum += measurement[key].temperature;
        });
        console.log('Sum', sum);
        console.log('Avg', sum / 5);
        const data = {
            average : (sum / 5).toFixed(1),
            rows: measurement
        };

        res.json(data)
    });
});


app.put('/api/v1/measurement/:id', (req, res) => {
    const userInput = req.body;
    const id = req.params.id;
    sql = `
          UPDATE measurement 
          SET temperature=${userInput.temperature} 
          WHERE id=${id};
        `;

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log(result);
        res.json(result);
    });

    console.log(req.body);
    console.log(sql);
});


app.listen(port, () => console.log('Server started on port ' + port));



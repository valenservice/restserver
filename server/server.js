require('./config/config');
require('./routes/index');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// habilitar carpeta public
console.log(path.resolve(__dirname, '../public'));
app.use(express.static(path.resolve(__dirname ,'../public')));

// Configuracion Global de Routes
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,
    { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de Datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log(`Listen Port ${process.env.PORT}`);
})
const next = require('next');
const express = require('express');
const student = require('./routes/student');
const admin = require('./routes/admin');
const candidate = require('./routes/candidate');
const bodyParser = require('body-parser');
const mongoose = require('./database/connect');
const exp = express();
const path = require('path');
require('dotenv').config()

console.log("checking dotenv",__dirname + '/.env' , process.env.CONTRACT_ADDRESS)

console.log("Checking the ENV", __dirname + '/.env',process.env.CONTRACT_ADDRESS);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('connected',() => console.log('Connected to Mongo Database') );


exp.use(express.static(path.join(__dirname, 'public')));
exp.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
exp.use(bodyParser.json());
console.log(path.join(__dirname, 'public'),path.join(__dirname, 'pages/homepage.js'));

exp.use('/admin', admin);

exp.use('/student', student);

exp.use('/candidate', candidate);

const app = next({
    dev: process.env.NODE_ENV !== 'production',
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    exp.use(handler).listen(3000, function () {
        console.log('Server listening on port 3000, access with "http://localhost:3000/"  please');
    });
});



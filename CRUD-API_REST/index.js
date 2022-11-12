const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});
// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const whiteList = [process.env.FRONT_END_URL];
const corsOptions = {
    origin:(origin,callback) => {
        const existe = whiteList.some(dominion => dominion === origin);
        if(existe) {
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}
app.use(cors(corsOptions));
app.use('/', routes());
app.use(express.static('uploads'));
app.listen(5000);
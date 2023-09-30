import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web'
import connectDB from './config/connectDB'
// import connection from './config/connectDB'
import initAPIRoute from './route/api'

require('dotenv').config()

const app = express();

// app.use(cors({ origin: true }));
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// console.log(port);

// app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

configViewEngine(app);

// initWebRoute(app);

//viet api
initAPIRoute(app);

connectDB();

// handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs');
})

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}) 
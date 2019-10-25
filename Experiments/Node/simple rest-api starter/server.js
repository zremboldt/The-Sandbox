// https://youtu.be/fgTGADljAeg?list=WL

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('err', err => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(3000, () => console.log('Server started'));

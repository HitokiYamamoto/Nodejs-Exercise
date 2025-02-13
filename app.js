const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = process.env.CONNECTION_STRING
const Campground = require('./models/campground');

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDBコネクションOK!!');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー!!!');
        console.log(err);
    });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: '私の庭', description: '気軽に安くキャンプ!!'});
    await camp.save();
    res.send(camp);
});

app.listen(8000, () => {
    console.log('ポート8000でリクエスト待受中')
});
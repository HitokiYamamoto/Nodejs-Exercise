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

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.listen(8000, () => {
    console.log('ポート8000でリクエスト待受中')
});
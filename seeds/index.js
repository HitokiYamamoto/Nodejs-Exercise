const mongoose = require('mongoose');
const mongoURI = process.env.CONNECTION_STRING
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDBコネクションOK!!');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー!!!');
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
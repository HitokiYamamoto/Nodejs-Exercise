const mongoose = require('mongoose');
const mongoURI = process.env.CONNECTION_STRING
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')

const adjectives = ["美しい", "静かな", "快適な", "楽しい", "素晴らしい", "不思議な"];
const nouns = ["キャンプ場", "湖", "山", "森", "風景", "川"];
const verbs = ["楽しむ", "探検する", "リラックスする", "歩く", "泳ぐ"];

const generateRandomDescription = () => {
    const adjective = sample(adjectives);
    const noun = sample(nouns);
    const verb = sample(verbs);

    return `${adjective} ${noun}で、みんなで${verb}ことができる素敵な場所です。`;
};

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
        const price = Math.floor(Math.random() * 2000) + 1000;
        const camp = new Campground({
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: generateRandomDescription(),
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
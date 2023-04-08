const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelper")
const Campground = require("../models/campground")


mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp")

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "640d9abdcc52ba2dbd5cfbb1",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/ds46wgwfu/image/upload/v1679237736/YelpCamp/h1g7xfbmd2zetfnejmpo.jpg',
                    filename: 'YelpCamp/h1g7xfbmd2zetfnejmpo',
                },
                {
                    url: 'https://res.cloudinary.com/ds46wgwfu/image/upload/v1679237736/YelpCamp/vnfhb25sxsdv26moqj0r.jpg',
                    filename: 'YelpCamp/vnfhb25sxsdv26moqj0r',
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus cupiditate impedit explicabo fugiat quam. Eius consectetur perferendis ullam aperiam fugiat at quas, cumque commodi et magni quam natus nobis earum.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })

        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
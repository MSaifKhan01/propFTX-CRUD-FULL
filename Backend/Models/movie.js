const mongoose = require("mongoose")

//movie schema
const movieSchema = mongoose.Schema({

    image: String,
    title: String,

    actors: String,
    releasYear:Date,
    rating:Number,
    userID: String
},
    {
        versionKey: false
});

const movieModel = mongoose.model("movie", movieSchema)

module.exports = {
    movieModel
}
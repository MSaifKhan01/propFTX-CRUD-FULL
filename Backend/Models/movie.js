const mongoose = require("mongoose")

//movie schema
const movieSchema = mongoose.Schema({

    image: String,
    title: String,

    actors: String,
    releaseYear:String,
    rating:Number,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
},
    {
        versionKey: false
});

const movieModel = mongoose.model("movie", movieSchema)

module.exports = {
    movieModel
}
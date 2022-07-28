require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    //database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        //useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected!")
    }).catch(e => {
        console.log(e);
    });


}

module.exports = connectDB
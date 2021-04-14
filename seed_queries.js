const mongoose = require('mongoose');
const queries = require('./models/queries');

mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const query = [
    {
        heading: "Admin block timings",
        details: "Timings have been changed to 10 am to 5 pm"
    },
    {
        heading: "HoD IT",
        details: "HoD IT has changed"
    }
]

queries.insertMany(query).then(res => {
    console.log(res)
    console.log("Query data insertion successful")
}).catch(e => {
    console.log(e)
})
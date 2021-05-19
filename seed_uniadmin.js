const mongoose = require('mongoose');
const uniadmin = require('./models/uniadmin');
const uri = "mongodb+srv://db_admin_user:w7G8zsHjAcFQaQt@cluster0.v3icg.mongodb.net/IGDTUW_tour?retryWrites=true&w=majority" || 'mongodb://localhost/IGDTUW_tour';

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const uniadmins = [
    {
        name: "Rakesh",
        email: "rakesh@igdtuw.ac.in",
        password: "Rakesh123!",
    },
    {
        name: "Tina",
        email: "tina@igdtuw.ac.in",
        password: "Tina123!",
    }
]

uniadmin.insertMany(uniadmins).then(res => {
    console.log(res)
    console.log("Uni admin data insertion successful")
}).catch(e => {
    console.log(e)
})
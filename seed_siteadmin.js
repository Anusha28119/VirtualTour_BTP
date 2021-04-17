const mongoose = require('mongoose');
const siteadmin = require('./models/siteadmin');
const uri = "mongodb+srv://db_admin_user:w7G8zsHjAcFQaQt@cluster0.v3icg.mongodb.net/IGDTUW_tour?retryWrites=true&w=majority" || 'mongodb://localhost/IGDTUW_tour';

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const siteadmins = [
    {
        name: "Alice Jones",
        email: "alice_jones@gmail.com",
        password: "password",
    },
    {
        name: "Jake Cooper",
        email: "jcooper@gmail.com",
        password: "password",
    }
]

siteadmin.insertMany(siteadmins).then(res => {
    console.log(res)
    console.log("Site admin data insertion successful")
}).catch(e => {
    console.log(e)
})
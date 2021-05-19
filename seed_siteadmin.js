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
        name: "Anusha",
        email: "anusha042btit17@igdtuw.ac.in",
        password: "Anusha123!",
    },
    {
        name: "Gurmeisha",
        email: "gurmeisha033btit17@igdtuw.ac.in",
        password: "Gurmeisha123!",
    }
]

siteadmin.insertMany(siteadmins).then(res => {
    console.log(res)
    console.log("Site admin data insertion successful")
}).catch(e => {
    console.log(e)
})
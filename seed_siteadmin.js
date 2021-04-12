const mongoose = require('mongoose');
const siteadmin = require('./models/siteadmin');

mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
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
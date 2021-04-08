const mongoose = require('mongoose');
const uniadmin = require('./models/uniadmin');

mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const uniadmins = [
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

uniadmin.insertMany(uniadmins).then(res => {
    console.log(res)
    console.log("Uni admin data insertion successful")
}).catch(e => {
    console.log(e)
})
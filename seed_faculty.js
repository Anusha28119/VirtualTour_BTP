const mongoose = require('mongoose');
const uniadmin = require('./models/faculty');

mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const faculties = [
    {
        name: "Sumedha",
        email: "sumedha@gmail.com",
        password: "facultypass",
    },
    
]

uniadmin.insertMany(faculties).then(res => {
    console.log(res)
    console.log("Faculty data insertion successful")
}).catch(e => {
    console.log(e)
})
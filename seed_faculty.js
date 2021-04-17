const mongoose = require('mongoose');
const faculty = require('./models/faculty');

mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const faculties = [
    {
        name: "Radha",
        email: "radha@gmail.com",
        password: "facultypass",
    },
    {
        name: "Varsha",
        email: "varsha@gmail.com",
        password: "password",
    }
]

faculty.insertMany(faculties).then(res => {
    console.log(res)
    console.log("Faculty data insertion successful")
}).catch(e => {
    console.log(e)
})
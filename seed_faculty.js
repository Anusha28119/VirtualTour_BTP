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
        name: "Meisha",
        email: "meisha@gmail.com",
        password: "facultypass",
    },
    {
        name: "Anusha",
        email: "anusha@gmail.com",
        password: "password",
    }
]

faculty.insertMany(faculties).then(res => {
    console.log(res)
    console.log("Faculty data insertion successful")
}).catch(e => {
    console.log(e)
})
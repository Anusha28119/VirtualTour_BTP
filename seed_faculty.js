const mongoose = require('mongoose');
const faculty = require('./models/faculty');
const uri = "mongodb+srv://db_admin_user:w7G8zsHjAcFQaQt@cluster0.v3icg.mongodb.net/IGDTUW_tour?retryWrites=true&w=majority" || 'mongodb://localhost/IGDTUW_tour';

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
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
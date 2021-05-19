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
        email: "radha@igdtuw.ac.in",
        password: "Radha123!",
    },
    {
        name: "Varsha",
        email: "varsha@igdtuw.ac.in",
        password: "Varsha123!",
    }
]

faculty.insertMany(faculties).then(res => {
    console.log(res)
    console.log("Faculty data insertion successful")
}).catch(e => {
    console.log(e)
})
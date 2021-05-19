const mongoose = require('mongoose');
const student = require('./models/student');
const uri = "mongodb+srv://db_admin_user:w7G8zsHjAcFQaQt@cluster0.v3icg.mongodb.net/IGDTUW_tour?retryWrites=true&w=majority" || 'mongodb://localhost/IGDTUW_tour';

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


const students = [
    {
        name: "Sumedha",
        email: "sumedha008btit17@igdtuw.ac.in",
        password: "Sumedha123!",
    },
    {
        name: "Gurmeisha",
        email: "gurmeisha033btit17@igdtuw.ac.in",
        password: "Gurmeisha123!",
    }
    
]

student.insertMany(students).then(res => {
    console.log(res)
    console.log("Student data insertion successful")
}).catch(e => {
    console.log(e)
})
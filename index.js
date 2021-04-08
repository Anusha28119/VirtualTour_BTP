const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const student = require('./models/student');
const faculty = require('./models/faculty');
const uniadmin = require('./models/uniadmin');
const siteadmin = require('./models/siteadmin');
const { urlencoded } = require('express');
const { request } = require('http');
const session = require('express-session');
const ejsMate = require('ejs-mate');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'Not a good secret' }));
app.engine('ejs', ejsMate);

app.listen(3000, () => {
    console.log("App is listening on port 3000!")
})

mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});

app.get('/universityadmin', (req, res) => {
    res.render('users/uniadmin')
})

app.get('/universityadmin/edit', (req, res) => {
    res.render('users/edit_profile')
})



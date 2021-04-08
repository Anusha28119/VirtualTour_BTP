const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const student = require('./models/student');
const faculty = require('./models/faculty');
const uniadmin = require('./models/uniadmin');
const siteadmin = require('./models/siteadmin');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("App is listening on port 3000!")

})
const requireLogin =(req,res, next) =>{
    if(!req.session.user_id)
    {
        return res.redirect('/home')
    }
    
    next();
}
mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});

app.get('/home',requireLogin,async(req,res) => {

    var x=req.session.user_id;
    console.log(x)
    const user = await entrepreneur.findOne({session_id:x});
    console.log(user);
    res.render('users/faculty_member',{users:user})
 })
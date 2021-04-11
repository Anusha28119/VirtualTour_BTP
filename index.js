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
const catchAsync = require('./utils/catchAsync');
const uniAdmin = require('./models/uniadmin');
const bcrypt = require('bcrypt');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'Not a good secret' }));
app.engine('ejs', ejsMate);

app.listen(3000, () => {
    console.log("App is listening on port 3000!")
})

app.get('/login', (req,res) => {
    res.render('users/login')
})

app.post('/login', catchAsync(async(req,res) => {
    const{email, password, User} = req.body;
    console.log(User);
    if(User == 'student'){
        const user = await student.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         //const validPassword= await bcrypt.compare(password, user.password);
         var validPassword;
         if(user.password == password)
            validPassword=1;
        else
        validPassword=0;
         if(validPassword){
            user.session_id=user._id;
            req.session.user_id=user._id;
            await user.save()
            const users = await student.findOne({email});
            res.render('users/profile_student', {users:users});
            //res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
        }
        
    }
    else if(User == 'uniadmin'){
         const user = await uniadmin.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         
         if(password==user.password){
            user.session_id=user._id;
            req.session.user_id=user._id;
            await user.save()

            console.log(req.session.user_id)
            //res.send(user);
            console.log(user);
            global.User_profile=user;
            //console.log(users);
            const users = await uniadmin.findOne({email});
            //user.session_id=user._id;
            //await user.save()
            res.render('users/profile_uniadmin', {users:users});
          }
         else{
           res.status(401).send('Incorrect username or password. Please try again!');  
           res.redirect('/login')
          }
        }
    }else if( User == 'siteadmin'){
         const user = await siteadmin.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         const validPassword= await bcrypt.compare(password, user.password);
         if(validPassword){
            user.session_id=user._id;
            req.session.user_id=user._id;
            await user.save()
            const users = await siteadmin.findOne({email});
            res.render('users/profile_siteadmin', {users:users});
            //res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
        }
    }else if(User == 'faculty'){
         const user = await faculty.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         const validPassword= await bcrypt.compare(password, user.password);
         if(validPassword){
            user.session_id=user._id;
            req.session.user_id=user._id;
            await user.save()
            const users = await faculty.findOne({email});
            var x = users.org_name;
            console.log(x);
            const userr = await faculty.find({org_name:x});
            // userr.session_id=user._id;
            // await userr.save()
            // console.log(userr)
            res.render('users/profile_faculty', {users:users,userrr:userr});
            //res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
         }
    }

}))



mongoose.connect('mongodb://localhost/IGDTUW_tour', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});

app.post('/universityadmin/edit', catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    const user = await uniadmin.findOne({ email });
    // const hash_pwd = await bcrypt.hash(req.body.password, 12);

    // const newUniadmin = new uniAdmin({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // })
    // await newUniadmin.save()
    user.password=req.body.password;
    req.session.user_id = user._id;
    console.log(user)
    res.render('users/profile_uniadmin', { users: user })
}))

app.get('/home', (req, res) => {
    res.render('users/tour')
})

app.get('/universityadmin', (req, res) => {
    res.render('users/profile_uniadmin')
})

app.get('/universityadmin/edit', (req, res) => {
    res.render('users/edit_profile')
})



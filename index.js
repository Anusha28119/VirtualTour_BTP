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

const requireLogin =(req,res, next) =>{
    if(!req.session.user_id)
    {
        return res.redirect('/login')
    }
    
    next();

}


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
        
        if(password==user.password){
           user.session_id=user._id;
           req.session.user_id=user._id;
           await user.save()

           console.log(req.session.user_id)
           //res.send(user);
           console.log(user);
           global.User_profile=user;
           
           const users = await student.findOne({email});
           //user.session_id=user._id;
           //await user.save()
           console.log(users);
           res.render('users/profile_student', {users:users});
         }
        else{
          res.status(401).send('Incorrect username or password. Please try again!');  
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
             console.log(user);
         
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
            req.session.user_id=user._id;
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
        
        if(password==user.password){
           user.session_id=user._id;
           req.session.user_id=user._id;
           await user.save()

           console.log(req.session.user_id)
           //res.send(user);
           console.log(user);
           global.User_profile=user;
           //console.log(users);
           const users = await faculty.findOne({email});
           //user.session_id=user._id;
           //await user.save()
           res.render('users/profile_faculty', {users:users});
         }
        else{
          res.status(401).send('Incorrect username or password. Please try again!');  
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

app.get('/universityadmin', (req, res) => {
    res.render('users/profile_uniadmin')
})

app.post('/universityadmin/submitInput/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(req.body.password);
    //enter into a model
    console.log(user);
    await user.save()
    res.render('users/edit_success')

}))

app.post('/universityadmin/edit/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(req.body.password);
    user.password=req.body.password;
    console.log(user);
    await user.save()
    res.render('users/edit_success')

}))

app.post('/student/edit/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await student.findOne({session_id:x});
    console.log(req.body.password);
    user.password=req.body.password;
    console.log(user);
    await user.save()
    res.render('users/edit_success_student')

}))

app.post('/faculty/edit/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await faculty.findOne({session_id:x});
    console.log(req.body.password);
    user.password=req.body.password;
    console.log(user);
    await user.save()
    res.render('users/edit_success_faculty')

}))

app.post('/universityadmin/edit', requireLogin, catchAsync(async (req, res) => {
    
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(user)
    res.render('users/edit_profile', { users: user })
}))

app.post('/student/edit', requireLogin, catchAsync(async (req, res) => {
    var x=req.session.user_id;
    const user = await student.findOne({session_id:x});
    console.log(user)
    res.render('users/edit_profile_student', { users: user })
}))

app.post('/faculty/edit', requireLogin, catchAsync(async (req, res) => {
    var x=req.session.user_id;
    const user = await faculty.findOne({session_id:x});
    console.log(user)
    res.render('users/edit_profile_faculty', { users: user })
}))

app.post('/faculty/submitInput', requireLogin, catchAsync(async (req, res) => {
    
    var x=req.session.user_id;
    const user = await faculty.findOne({session_id:x});
    console.log(user)
    res.render('users/submit_input_faculty', { users: user })

}))



app.post('/student/submitInput', requireLogin, catchAsync(async (req, res) => {
    
    var x=req.session.user_id;
    const user = await student.findOne({session_id:x});
    console.log(user)
    res.render('users/submit_input_student', { users: user })

}))

app.post('/universityadmin/submitInput', requireLogin, catchAsync(async (req, res) => {
    
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(user)
    res.render('users/submit_input', { users: user })

}))



app.get('/universityadmin', (req, res) => {
    res.render('users/profile_uniadmin')
})

app.get('/student', (req, res) => {
    res.render('users/profile_student')
})

app.get('/universityadmin/edit', (req, res) => {
    res.render('users/edit_profile')
})
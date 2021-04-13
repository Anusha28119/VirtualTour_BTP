const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const student = require('./models/student');
const faculty = require('./models/faculty');
const uniadmin = require('./models/uniadmin');
const siteadmin = require('./models/siteadmin');
const message = require('./models/message');
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
           //console.log(users);
           const users = await student.findOne({email});
           //user.session_id=user._id;
           //await user.save()
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
        const user = await siteadmin.findOne({ email });
        if (user == null) {
            res.send("Try again")
        } else {
            console.log(user);

            if (password == user.password) {
                user.session_id = user._id;
                req.session.user_id = user._id;
                await user.save()

                console.log(req.session.user_id)
                //res.send(user);
                console.log(user);
                global.User_profile = user;
                //console.log(users);
                const users = await siteadmin.findOne({ email });
                //user.session_id=user._id;
                //await user.save()
                req.session.user_id = user._id;
                res.render('users/profile_webadmin', { users: users });
            }
            else {
                res.status(401).send('Incorrect username or password. Please try again!');
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
    const newMessage = new message({
        name: user.name,
        email: user.email,
        category: req.body.category,
        type: 'text',
        submission: req.body.submission,
        approved: 0,
        added: 0
    })
    await newMessage.save()
    console.log(newMessage)

    res.render('users/submit_input_success')

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

app.post('/universityadmin/edit', requireLogin, catchAsync(async (req, res) => {
    //const { name, email, password } = req.body;
    //console.log(req.body);
    var x=req.session.user_id;
    //console.log("Session Id")
    //console.log(x)
    const user = await uniadmin.findOne({session_id:x});
    //console.log("email")
    //console.log(req.body.email);

    //const user = await uniadmin.findOne({ email });
    // const hash_pwd = await bcrypt.hash(req.body.password, 12);

    // const newUniadmin = new uniAdmin({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // })
    // await newUniadmin.save()
    //user.password=req.body.password;
    //req.session.user_id = user._id;
    console.log(user)
    res.render('users/edit_profile', { users: user })
}))

app.get('/siteadmin/view/input', requireLogin, catchAsync(async (req, res) => {
    const dbo = message.find({})
    const users = await dbo
    console.log(users)
    res.render('users/view_input', { users })
}))

app.get('/home', (req, res) => {
    res.render('users/tour')
})

app.post('/universityadmin/submitInput/approve', requireLogin, catchAsync(async (req, res) => {

    var x = req.session.user_id;
    console.log(req.body)
    const user = await siteadmin.findOne({ session_id: x });
    const user_msg =  await message.findOne({email:req.body.email, submission: req.body.submission})
    console.log('This is the user message ka approval status')
    console.log(user_msg.approved)
    user_msg.approved=!user_msg.approved
    console.log('This is the user message ka naya approval status')
    console.log(user_msg.approved)
    await user_msg.save()
    res.render('users/approve_add_success')

}))

app.post('/universityadmin/submitInput/add', requireLogin, catchAsync(async (req, res) => {

    var x = req.session.user_id;
    console.log(req.body)
    const user = await siteadmin.findOne({ session_id: x });
    const user_msg = await message.findOne({ email: req.body.email, submission: req.body.submission })
    user_msg.added=1
    await user_msg.save()
    res.render('users/approve_add_success')

}))

app.post('/universityadmin/submitInput', requireLogin, catchAsync(async (req, res) => {
    
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(user)
    res.render('users/submit_input', { users: user })

}))

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})


app.get('/universityadmin', (req, res) => {
    res.render('users/profile_uniadmin')
})

app.get('/universityadmin/edit', (req, res) => {
    res.render('users/edit_profile')
})
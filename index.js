const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const student = require('./models/student');
const faculty = require('./models/faculty');
const uniadmin = require('./models/uniadmin');
const siteadmin = require('./models/siteadmin');
const message = require('./models/message');
const queries = require('./models/queries');
const { urlencoded } = require('express');
const { request } = require('http');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const uniAdmin = require('./models/uniadmin');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
const port = process.env.PORT||3000;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://db_admin_user:w7G8zsHjAcFQaQt@cluster0.v3icg.mongodb.net/IGDTUW_tour?retryWrites=true&w=majority" || 'mongodb://localhost/IGDTUW_tour';
// const uri = 'mongodb://localhost/IGDTUW_tour';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect().then(() => {
//     console.log('Database connection open!')
// }).catch(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log('Database connection error!')
//     console.log(err)
//     client.close();
// });

const store = MongoStore.create({
    mongoUrl: uri,
    secret: 'Not a good secret',
    touchAfter: 24*60*60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR",e)
    
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'Not a good secret',
    resave: false,
    saveUninitialized: true
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'Not a good secret' }));
app.use(session(sessionConfig));
app.engine('ejs', ejsMate);

app.listen(port, () => {
    console.log('App is listening on port '+ port)
})

//mongodb://localhost/IGDTUW_tour

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});

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
    console.log('Ye request ki body hai')
    console.log(req.body)
    console.log(User);
    if(User == 'student'){
        console.log('Inside student conditional')
        const user = await student.findOne({email});
        console.log('Ye user mila')
        console.log(user)
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
          res.status(401)
          res.render('users/incorrect_credentials')
         }
       }
    }
    else if(User == 'uniadmin'){
         const user = await uniadmin.findOne({email});
        console.log('Ye user mila')
        console.log(user)
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
            console.log(user)
        
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
           req.session.user_id = user._id;
           res.render('users/profile_faculty', {users:users});
         }
        else{
          res.status(401).send('Incorrect username or password. Please try again!');  
          res.redirect('/login')
         }
       }
    }

}))

app.get('/universityadmin', (req, res) => {
    res.render('users/profile_uniadmin')
})

// app.post('/universityadmin/searchQueries', requireLogin, catchAsync(async (req,res)=>{
    
//     const dbo = queries.find({})
//     const users = await dbo
//     console.log(users)
//     res.render('users/queries_uniadmin', { users })

// }))

// app.post('/student/searchQueries', requireLogin, catchAsync(async (req,res)=>{
    
//     const dbo = queries.find({})
//     const users = await dbo
//     console.log(users)
//     res.render('users/queries_student', { users })

// }))

// app.post('/faculty/searchQueries', requireLogin, catchAsync(async (req,res)=>{
    
//     const dbo = queries.find({})
//     const users = await dbo
//     console.log(users)
//     res.render('users/queries_faculty', { users })

// }))

app.get('/uniadmin/queries', requireLogin, catchAsync(async (req, res) => {
    const { category } = req.query
    console.log(category)
        const users = await queries.findOne({ heading:category });
        res.render('users/query_details_uniadmin', { user:users})

    // else {
    //     const users = await entrepreneur.find({})
    //     res.render('users/index', { users, category: 'All' })

    // }
}))

app.get('/faculty/queries', requireLogin, catchAsync(async (req, res) => {
    const { category } = req.query
    console.log(category)
        const users = await queries.findOne({ heading:category });
        res.render('users/query_details_faculty', { user:users})

}))

app.get('/student/queries', requireLogin, catchAsync(async (req, res) => {
    const { category } = req.query
    console.log(category)
        const users = await queries.findOne({ heading:category });
        res.render('users/query_details_student', { user:users})

}))


app.post('/universityadmin/filterQueries', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(req.body.password);
    user.password=req.body.password;
    console.log(user);
    await user.save()
    res.render('users/edit_success')

}))

app.post('/universityadmin/submitInput/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await uniadmin.findOne({session_id:x});
    console.log(req.body.password);
    //enter into a model
    const newMessage = new message({
        name: user.name,
        email: user.email,
        category: req.body.category,
        type: req.body.type,
        file: req.body.file,
        submission: req.body.submission,
        approved: 0,
        added: 0
    })
    await newMessage.save()
    console.log(newMessage)

    res.render('users/submit_input_success')

}))


app.post('/student/submitInput/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await student.findOne({session_id:x});
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

    res.render('users/submit_input_success_student')

}))

app.post('/faculty/submitInput/success', requireLogin, catchAsync(async (req,res)=>{
    var x=req.session.user_id;
    const user = await faculty.findOne({session_id:x});
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

    res.render('users/submit_input_success_faculty')

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

app.get('/siteadmin/view/input', requireLogin, catchAsync(async (req, res) => {
    const dbo = message.find({})
    const users = await dbo
    console.log(users)
    res.render('users/view_input', { users })
}))

app.post('/home_student', async (req,res) =>{
    res.render('users/tour_student')
})

app.post('/home_uniadmin', async (req, res) => {
    res.render('users/tour_uniadmin')
})

app.post('/home_faculty', async (req, res) => {
    res.render('users/tour_faculty')
})
app.get('/home', (req, res) => {
    res.render('users/tour')
})

app.get('/about_us', async (req, res) => {
    res.render('users/about_us')
})

app.get('/contact_us', async (req, res) => {
    res.render('users/contact_us')
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

app.post('/submitInput/delete', requireLogin, catchAsync(async (req, res) => {

    var x = req.session.user_id;
    console.log(req.body)
    const user = await siteadmin.findOne({ session_id: x });
    const user_msg = await message.findOne({ email: req.body.email, submission: req.body.submission })
    await user_msg.delete()
    res.render('users/delete_success')

}))

app.post('/universityadmin/submitInput/add', requireLogin, catchAsync(async (req, res) => {

    var x = req.session.user_id;
    console.log(req.body)
    const user = await siteadmin.findOne({ session_id: x });
    const user_msg = await message.findOne({ email: req.body.email, submission: req.body.submission })
    user_msg.added=1
    await user_msg.save()
    const newQuery = new queries({
        heading: req.body.category,
        details: req.body.submission,
        session_id: req.session.user_id
    })
    await newQuery.save()
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

app.get('/student', (req, res) => {
    res.render('users/profile_student')
})

app.get('/universityadmin/edit', (req, res) => {
    res.render('users/edit_profile')
})
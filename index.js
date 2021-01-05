const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const PORT = 4000;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, (req, res) => {
    console.log(`server is running at port ${PORT} blah blah blah blah`);
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// app.get('/about-us', (req, res) => {
//     // res.send('<h1>About Us</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'about-us.html'));
// })

// app.get('/contact', (req, res) => {
//     // res.send('<h1>About Us</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'contact.html'));
// })

app.use(express.static(path.join(__dirname, 'public')));

let users = [
    {
        id: 1,
        name: 'Habiba',
        email: 'asd@as.com',
        pwd: '1234'
    },
    {
        id: 2,
        name: 'Mumma',
        email: 'lop@lo.com',
        pwd: '5678'
    }
]
//sign up form
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration', 'sign-up.html'))
})

app.post('/signup', (req, res) => {
    let {name, email, pwd} = req.body;
    let found =users.some((item) => {
        return item.email == email
    })

    if(found)
        res.send('<p>User email already exists</p>');
        // res.redirect('/signup');

    else
        {
            users.push({
                id: users.lenght+1, name, email, pwd
            })
            res.redirect('/signin') 

        }
});

//sign in form
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration', 'sign-in.html'))
});
app.post('/signin', (req, res)=> {
    let {email, pwd} = req.body;
    let userEmail = users.some(item => {
        return item.email == email;
    });
    let userPwd = users.some(item => {
        return item.pwd == pwd;
    });
    if(userEmail && userPwd)
    {
        // res.send(`<p>Log in Successful</p>`)
        res.redirect('/home.html');
        // res.sendFile(path.join(__dirname, 'public', 'home.html'))
    }
    else {
        // res.send('<p>Email or password incorrect</p>')
        res.redirect('/signin');
    }
});
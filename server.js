const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();
app.use(express.json());
app.use(cors());
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

app.get('/', (req, res) => {
    res.send('This is working');
});
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)    
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
});

app.put('/image', image.handleImage(db));
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on ${process.env.PORT}`);
});

/*
res --> This is working
/signin --> POST = success/fail OK
/register --> POST = user OK
/profile/:userId --> GET = user
/image --> PUT = user
*/
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./requirements.yaml');
require('dotenv').config()


const verifyTheUser = require('./Middlewares/verify')


app = express()

app.use(cors())
app.use(express.json())

// DataBase Connection starts



// console.log(process.env.URL)
// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// // Connect to the server
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
const db = client.db('PioneerLabsBackEnd');
// console.log(db.collection('users').find())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://pioneerlabsbackend.onrender.com/");
    res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
    next()
});
// DataBase Connection Ends 


// User Registration Starts

app.post('/Register', async (req, res, next) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body
        console.log(username, email, password)
        const db_user = await db.collection('users').findOne({ "username": username })
        const mail_check = await db.collection('users').findOne({ "email": email })
        // console.log(db_user)

        if (db_user === null && mail_check === null) {
            const hashed_password = await bcrypt.hash(password, 10)
            const feed = await db.collection('users').insertOne({ username, password: hashed_password, email })
            console.log(feed)
            // res.status(200).send(feed)
            res.status(200).send({ data:'Successfully Registered..!' })
        } else if (db_user !== null) {
            res.status(400).send({ error: 'Username is already in use' })
        } else if (mail_check !== null) {
            res.status(400).send({ error: 'E-Mail is already in use' })
        }
        else {
            res.status(400).send({ error: 'Try again with different values' })
        }
    } catch (e) {
        console.error(e)
    }
})

// User Registration Ends 


// Login Functionality

app.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user_data = await db.collection('users').findOne({ "username": username })
        // res.send(user_data)
        console.log(user_data)
        if (user_data === null) {
            res.status(400).send({
                data: "User Not Found"
            })
        } else {
            const is_password_true = await bcrypt.compare(password, user_data.password)
            if (is_password_true === true) {
                const payload = {
                    username
                }
                const jwt_token = jwt.sign(payload, `Secret Token`)
                res.status(200).send({ jwt_token })
            } else {
                res.status(400).send({
                    data: "Incorrect Password"
                })
            }
        }

    } catch (e) {
        console.error(e)
    }
})


// Data Fetching with filtering options

app.get('/data',verifyTheUser, async (req, res) => {
    try {
        const { category, limit } = req.query; // Query Parameters 
        const apiUrl = 'https://api.publicapis.org/entries';
        const response = await fetch(apiUrl);
        const totalData = await response.json();
        const {count, entries} = totalData
        // res.json(data); 
        const reqData = entries.filter(e => e.Category.toLowerCase() === category.toLowerCase()) // Filtering Acc to Category 
        const result =  reqData.slice(0,limit) // Limiting the result
        res.status(200).send({data:result})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Swagger Documentation 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Restricted End Point 

app.get('/restricted',verifyTheUser,async(req,res,next) => {
    try{
        res.status(200).send({data:'You are Authenticated for this End Point.'})
    }catch(e){
        res.status(500).send({data:'You are\'nt Authenticated'})
    }
})



app.get('/', async (req, res, next) => {
    res.send('Welcome to 3005..! For Swagger direct to /docs')
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${3005}`);
});



module.exports = app

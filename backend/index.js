const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./utils/db');
const helmet = require('helmet');
const postRoutes = require("./routes/posts");

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded( { extended:false }));
app.use(express.json());


// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));


app.use('/api/posts',postRoutes);

sequelize.sync()
    .then( res => {
        const port = process.env.PORT || 5000;
        app.listen(port, ()=> console.log(`Server is running on Port : ${port}`));
    })
    .catch(err => console.log(err));
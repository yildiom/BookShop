const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross origin requests
app.use(cors());

// to be able to use env files
require('dotenv').config();
const uri = process.env.URI;

//connect to mongoDB
mongoose.connect(uri);
mongoose.connection.once('open', () => {
    console.log('connected to database')
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("listening for requests on port 4000");
});
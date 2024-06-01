const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

// middle ware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.use("/api/products", productRoute);

mongoose.connect('mongodb+srv://Admin:Admin@simplecrudapp.46gvvy8.mongodb.net/Node-API')
  .then(() => {
    console.log('Mongo DB Connected!');
    app.listen(4000, ()=> {
        console.log('Server is running on port 4000');
    });
})
.catch(()=>{
    console.log('Mongo DB Connection failed');
})
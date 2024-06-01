const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello from Node API");
});

app.post('/api/products', async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

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
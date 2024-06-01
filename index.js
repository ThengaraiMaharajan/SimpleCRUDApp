const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("Hello from Node API");
});

// View All Products
app.get('/api/products', async (req,res)=>{
    try{
      const products = await Product.find({});
      res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

// View An individual Product
app.get('/api/product/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

// Add products
app.post('/api/products', async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

// update a product
app.put('/api/product/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message : "Product Not Found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

// delete a product
app.delete('/api/product/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message : "product not found"});
        }
        res.status(200).json({message : "product Deleted Successfully"});
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